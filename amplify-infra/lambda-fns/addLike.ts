import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { addLikeInput, Like } from "./Like";

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

async function addLike(like: addLikeInput) {
  // Add the like item
  const id = uuidv4();
  const params = {
    TableName: process.env.NOTES_TABLE!,
    Item: {
      pk: "NOTE#" + like.noteId,
      sk: "LIKE#" + like.creator,
      id: uuidv4(),
      noteId: like.noteId,
      creator: like.creator,
    },
  };

  // Update the score on the post
  const params2: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: process.env.NOTES_TABLE!,
    Key: {
      pk: "NOTE#" + like.noteId,
      sk: "USER#" + like.creator,
    },
    UpdateExpression: "add score :p",
    ExpressionAttributeValues: { ":p": 1 },
  };
  try {
    // ! Should be transaction, one fails, both should fail
    await docClient.put(params).promise();
    await docClient.update(params2).promise();
    return "like added";
  } catch (err) {
    console.log("DynamoDB error: ", err);
    throw new Error("Could not add like");
  }
}

export default addLike;
