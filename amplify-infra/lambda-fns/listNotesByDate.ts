import * as AWS from "aws-sdk";
const docClient: AWS.DynamoDB.DocumentClient =
  new AWS.DynamoDB.DocumentClient();

async function listNotesByDate(date: string) {
  const filter = new Date(date).toISOString().split("T")[0];
  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.NOTES_TABLE!,
    IndexName: "dateIndex",
    KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sortkeyval)",
    ExpressionAttributeValues: {
      ":sortkeyval": "USER#",
      ":pk": filter,
    },
    ExpressionAttributeNames: { "#sk": "sk", "#pk": "createdAt" },
  };
  try {
    const data = await docClient.query(params).promise();
    return data.Items;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    throw new Error("Could not get notes");
  }
}

export default listNotesByDate;

const dateMatch = (date: Date, filter: Date) => {
  return (
    date.getDate() == filter.getDate() &&
    date.getMonth() == filter.getMonth() &&
    date.getFullYear() == filter.getFullYear()
  );
};
