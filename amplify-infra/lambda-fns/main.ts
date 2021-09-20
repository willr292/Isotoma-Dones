import createNote from "./createNote";
import deleteNote from "./deleteNote";
import getNoteById from "./getNoteById";
import listNotes from "./listNotes";
import listNotesByDate from "./listNotesByDate";
import Note from "./Note";
import updateNote from "./updateNote";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    noteId: string;
    note: Note;
    date: string;
  };
};

export const handler = async (event: AppSyncEvent) => {
  switch (event.info.fieldName) {
    case "getNoteById":
      return await getNoteById(event.arguments.noteId);
    case "createNote":
      return await createNote(event.arguments.note);
    case "listNotes":
      return await listNotes();
    case "listNotesByDate":
      return await listNotesByDate(event.arguments.date);
    case "deleteNote":
      return await deleteNote(event.arguments.noteId);
    case "updateNote":
      return await updateNote(event.arguments.note);
    default:
      return null;
  }
};
