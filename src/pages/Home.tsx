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
  useListNotesQuery,
} from "../generated/graphql";
import "./Home.css";

function Home() {
  let history = useHistory();
  const { data, loading, error } = useListNotesQuery();
  const [deleteNote] = useDeleteNoteMutation();
  const [addLike] = useAddLikeMutation();
  const [dateFilter, setDateFilter] = useState(new Date().toISOString());

  async function handleDelete(id: string) {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();
    await deleteNote({
      variables: { noteId: id, userId: user.getUsername() },
      update: (cache) => {
        cache.evict({ id: "ROOT_QUERY", fieldName: "listNotes" });
      },
    });
  }

  const dateMatch = (date: Date, filter: Date) => {
    return (
      date.getDate() === filter.getDate() &&
      date.getMonth() === filter.getMonth() &&
      date.getFullYear() === filter.getFullYear()
    );
  };

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
            {data!.listNotes
              ?.filter((x) =>
                dateMatch(new Date(x?.createdAt!), new Date(dateFilter))
              )
              .map((x) =>
                !x ? null : (
                  <div className="post" key={x.id}>
                    {x.description} -
                    {new Date(x.createdAt).toLocaleDateString("en-GB")}
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
                            cache.evict({
                              id: "ROOT_QUERY",
                              fieldName: "listNotes",
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
