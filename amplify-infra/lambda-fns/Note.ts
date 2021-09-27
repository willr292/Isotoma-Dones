type Note = {
  id: string;
  description: string;
  createdAt: string;
  creator: string;
  score: number;
};

export type NoteInput = {
  description: string;
  creator: string;
};

export type UpdateNoteInput = {
  description: string;
};

export type DeleteNoteInput = {
  noteId: string;
  userId: string;
};

export default Note;
