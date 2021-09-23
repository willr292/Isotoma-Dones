import { Like } from "./Like";

type Note = {
  id: string;
  description: string;
  createdAt: string;
  creator: string;
};

type NoteInput = {
  description: string;
  creator: string;
};

type UpdateNoteInput = {
  description: string;
};

export default Note;
