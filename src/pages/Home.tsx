import React from "react";
import "./Home.css";
import AddNoteForm from "../components/AddNoteForm";
import { useListNotesQuery } from "../generated/graphql";

function Home() {
  const { data, loading, error } = useListNotesQuery();

  if (!loading && !data) {
    return <div>error {error}</div>;
  }

  return (
    <div className="App">
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <>
          <AddNoteForm />
          <div>
            {data!.listNotes?.map((x) => (
              <p>{x?.name}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
