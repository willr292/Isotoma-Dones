import Auth, { CognitoUser } from "@aws-amplify/auth";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router";
import AddNoteForm from "../components/AddNoteForm";
import CommentSection from "../components/CommentSection";
import LikeButton from "../components/LikeButton";
import {
  useDeleteNoteMutation,
  useListNotesByDateLazyQuery,
} from "../generated/graphql";
import "./Home.css";

function Home() {
  let history = useHistory();
  const [deleteNote] = useDeleteNoteMutation();
  const [dateFilter, setDateFilter] = useState(new Date().toISOString());
  const [getNotes, { data, loading, error }] = useListNotesByDateLazyQuery();

  useEffect(() => {
    async function fetchUsername() {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        getNotes({
          variables: {
            date: dateFilter,
            userId: user.getUsername(),
          },
        });
      }
    }

    fetchUsername();
  }, [dateFilter]);

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
                  <LikeButton
                    score={x.score}
                    voteStatus={x.voteStatus}
                    noteId={x.id}
                  />
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
