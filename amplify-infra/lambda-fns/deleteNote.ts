import * as AWS from "aws-sdk";
import { DeleteNoteInput } from "./Note";
const docClient = new AWS.DynamoDB.DocumentClient();

async function deleteNote(input: DeleteNoteInput) {
  const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
    TableName: process.env.NOTES_TABLE!,
    Key: {
      pk: "NOTE#" + input.noteId,
      sk: "USER#" + input.userId,
    },
  };
  try {
    console.log(input.noteId + " " + input.userId);
    await docClient.delete(params).promise();
    return "Delete Success";
  } catch (err) {
    console.log("DynamoDB error: ", err);
    throw new Error("delete failed");
  }
}

export default deleteNote;
