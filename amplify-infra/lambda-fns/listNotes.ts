import * as AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient();

async function listNotes() {
  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.NOTES_TABLE!,
    FilterExpression: "begins_with(#sk, :sortkeyval)",
    ExpressionAttributeValues: { ":sortkeyval": "USER#" },
    ExpressionAttributeNames: { "#sk": "sk" },
  };
  try {
    const data = await docClient.scan(params).promise();
    console.log(data);
    return data.Items?.map((x) => x.val);
  } catch (err) {
    console.log("DynamoDB error: ", err);
    throw new Error("Could not fetch Notes");
  }
}

export default listNotes;
