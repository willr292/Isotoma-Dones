type Note = {
  id: string;
  description: string;
  createdAt: string;
};

type NoteInput = {
  description: string;
};

type UpdateNoteInput = {
  description: string;
};

export default Note;
