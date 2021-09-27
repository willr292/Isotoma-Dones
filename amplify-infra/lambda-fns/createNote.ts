import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { NoteInput } from "./Note";

let config: any;
const isTest = process.env.JEST_WORKER_ID;
if (isTest) {
  config = {
    convertEmptyValues: true,
    ...(isTest && {
      endpoint: "localhost:8000",
      sslEnabled: false,
      region: "local-env",
    }),
  };
} else {
  config = {};
}

const docClient = new AWS.DynamoDB.DocumentClient(config);

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
      createdAt: now.toISOString().split("T")[0],
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
