import * as AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient();
import { v4 as uuidv4 } from "uuid";
import { default as Note, default as NoteInput } from "./Note";

async function createNote(input: NoteInput) {
  const now = new Date();
  const id = uuidv4();
  const params = {
    TableName: process.env.NOTES_TABLE!,
    Item: {
      pk: "NOTE#" + id,
      sk: "USER#" + input.creator,
      id: id,
      description: input.description,
      createdAt: now.toISOString(),
      creator: input.creator,
      score: 0,
    },
  };

  try {
    await docClient.put(params).promise();
    return "Note Created successfully";
  } catch (err) {
    console.log("DynamoDB error: ", err);
    throw new Error("Note not created");
  }
}

export default createNote;
