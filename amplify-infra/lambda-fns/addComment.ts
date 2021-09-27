import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import addCommentInput from "./Comment";

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

async function addComment(comment: addCommentInput) {
  const id = uuidv4();
  const params = {
    TableName: process.env.NOTES_TABLE!,
    Item: {
      pk: "NOTE#" + comment.noteId,
      sk: "COMMENT#" + id,
      id: uuidv4(),
      noteId: comment.noteId,
      creator: comment.creator,
      content: comment.content,
    },
  };

  try {
    await docClient.put(params).promise();
    return "comment added";
  } catch (err) {
    console.log("DynamoDB error: ", err);
    throw new Error("Could not add comment");
  }
}

export default addComment;
