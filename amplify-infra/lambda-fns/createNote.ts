import * as AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient();
import { v4 as uuidv4 } from "uuid";
import { default as Note, default as NoteInput } from "./Note";

async function createNote(input: NoteInput) {
  const now = new Date();
  const note: Note = {
    id: uuidv4(),
    description: input.description,
    createdAt: now.toISOString(),
    creator: input.creator,
  };

  const params = {
    TableName: process.env.NOTES_TABLE!,
    Item: {
      pk: "NOTE#" + note.id,
      sk: "USER#" + input.creator,
      val: note,
    },
  };

  try {
    await docClient.put(params).promise();
    return note;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    throw new Error("Note not created");
  }
}

export default createNote;
