import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { addLikeInput, Like } from "./Like";

const docClient = new AWS.DynamoDB.DocumentClient();

async function addLike(like: addLikeInput) {
  const item: Like = {
    id: uuidv4(),
    noteId: like.noteId,
    creator: like.creator,
  };
  const params = {
    TableName: process.env.NOTES_TABLE!,
    Item: { pk: "NOTE#" + like.noteId, sk: "LIKE#" + item.id, val: item },
  };
  try {
    await docClient.put(params).promise();
    return "like added";
  } catch (err) {
    console.log("DynamoDB error: ", err);
    throw new Error("Could not add like");
  }
}

export default addLike;
