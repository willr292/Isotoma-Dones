const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import Note from "./Note";
import NoteInput from "./Note";
import { v4 as uuidv4 } from "uuid";

async function createNote(input: NoteInput) {
  const now = new Date();
  const note: Note = {
    id: uuidv4(),
    description: input.description,
    createdAt: now.toISOString(),
  };

  const params = {
    TableName: process.env.NOTES_TABLE,
    Item: note,
  };

  try {
    await docClient.put(params).promise();
    return note;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return null;
  }
}

export default createNote;
