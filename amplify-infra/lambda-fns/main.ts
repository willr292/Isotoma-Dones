import createNote from "./createNote";
import deleteNote from "./deleteNote";
import getNoteById from "./getNoteById";
import listNotes from "./listNotes";
import listNotesByDate from "./listNotesByDate";
import Note, { DeleteNoteInput, NoteInput } from "./Note";
import updateNote from "./updateNote";
import createUser from "./createUser";
import { addLikeInput } from "./Like";
import addLike from "./addLike";
import addComment from "./addComment";
import addCommentInput from "./Comment";
import getCommentsbyNoteId from "./getCommentsByNoteId";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    noteId: string;
    note: NoteInput;
    date: string;
    user: UserCreateInput;
    like: addLikeInput;
    comment: addCommentInput;
    input: DeleteNoteInput;
    userId: string;
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
      return await listNotesByDate(
        event.arguments.date,
        event.arguments.userId
      );
    case "deleteNote":
      return await deleteNote(event.arguments.input);
    case "updateNote":
      return await updateNote(event.arguments.note);
    case "createUser":
      return await createUser(event.arguments.user);
    case "addLike":
      return await addLike(event.arguments.like);
    case "addComment":
      return await addComment(event.arguments.comment);
    case "getCommentsByNoteId":
      return await getCommentsbyNoteId(event.arguments.noteId);
    default:
      return null;
  }
};
