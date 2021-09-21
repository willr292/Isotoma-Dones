import createNote from "./createNote";
import deleteNote from "./deleteNote";
import getNoteById from "./getNoteById";
import listNotes from "./listNotes";
import listNotesByDate from "./listNotesByDate";
import Note from "./Note";
import updateNote from "./updateNote";
import createUser from "./createUser";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    noteId: string;
    note: Note;
    date: string;
    user: UserCreateInput;
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
    case "createUser":
      return await createUser(event.arguments.user);
    default:
      return null;
  }
};
