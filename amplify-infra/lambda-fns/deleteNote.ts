const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function deleteNote(noteId: string, userId: string) {
  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: {
      pk: "NOTE#" + noteId,
      sk: "USER#" + userId,
    },
  };
  try {
    await docClient.delete(params).promise();
    return noteId;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return "Delete failed";
  }
}

export default deleteNote;
