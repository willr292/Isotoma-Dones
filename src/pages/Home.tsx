import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddNoteForm from "../components/AddNoteForm";
import { useDeleteNoteMutation, useListNotesQuery } from "../generated/graphql";
import "./Home.css";

function Home() {
  const { data, loading, error } = useListNotesQuery();
  const [deleteNote] = useDeleteNoteMutation();
  const [dateFilter, setDateFilter] = useState(new Date().toISOString());

  async function handleDelete(id: string) {
    await deleteNote({
      variables: { noteId: id },
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
          <div>
            {data!.listNotes
              ?.filter((x) =>
                dateMatch(new Date(x?.createdAt!), new Date(dateFilter))
              )
              .map((x) =>
                !x ? null : (
                  <p key={x.id}>
                    {x.description} -{" "}
                    {new Date(x.createdAt).toLocaleDateString("en-GB")}
                    <button onClick={() => handleDelete(x.id)}>X</button>
                  </p>
                )
              )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
