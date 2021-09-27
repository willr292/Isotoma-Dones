import Auth, { CognitoUser } from "@aws-amplify/auth";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router";
import AddNoteForm from "../components/AddNoteForm";
import CommentSection from "../components/CommentSection";
import {
  useAddLikeMutation,
  useDeleteNoteMutation,
  useListNotesByDateQuery,
} from "../generated/graphql";
import "./Home.css";

function Home() {
  let history = useHistory();
  //const { data, loading, error } = useListNotesQuery();
  const [deleteNote] = useDeleteNoteMutation();
  const [addLike] = useAddLikeMutation();
  const [dateFilter, setDateFilter] = useState(new Date().toISOString());
  const { data, loading, error } = useListNotesByDateQuery({
    variables: {
      date: dateFilter,
    },
  });

  async function handleDelete(id: string) {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();
    console.log(id + " " + user.getUsername());
    await deleteNote({
      variables: { input: { noteId: id, userId: user.getUsername() } },
      update: (cache) => {
        cache.evict({ id: "ROOT_QUERY", fieldName: "listNotesByDate" });
      },
    });
  }

  if (!loading && !data) {
    return <div>error {error}</div>;
  }

  return (
    <div className="App">
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <>
          <button
            onClick={async () => {
              await Auth.signOut();
              history.push("/login");
            }}
          >
            Log Out
          </button>
          <button
            onClick={() => {
              history.push("/admin");
            }}
          >
            Admin Page
          </button>
          <AddNoteForm />
          <DatePicker
            selected={new Date(dateFilter)}
            dateFormat="dd/MM/yy"
            onChange={(d: Date) => {
              if (d) {
                setDateFilter(d.toISOString());
              }
            }}
          />
          <div className="post-container">
            {data!.listNotesByDate?.map((x) =>
              !x ? null : (
                <div className="post" key={x.id}>
                  {x.description} -
                  {" " + new Date(x.createdAt).toLocaleDateString("en-GB")}
                  <button
                    //disabled={x.voteStatus}
                    onClick={async () => {
                      const user: CognitoUser =
                        await Auth.currentAuthenticatedUser();
                      await addLike({
                        variables: {
                          like: {
                            noteId: x.id,
                            creator: user.getUsername(),
                          },
                        },
                        update: (cache) => {
                          console.log(cache);
                          cache.evict({
                            id: "ROOT_QUERY",
                            fieldName: "listNotesByDate",
                          });
                        },
                      });
                    }}
                  >
                    👍 - {x.score}
                  </button>
                  <button onClick={() => handleDelete(x.id)}>🗑️</button>
                  <br />
                  <CommentSection noteId={x.id} />
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
