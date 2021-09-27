import { KeyCondition } from "@aws-cdk/aws-appsync";
import * as AWS from "aws-sdk";
const docClient: AWS.DynamoDB.DocumentClient =
  new AWS.DynamoDB.DocumentClient();

async function listNotesByDate(date: string, userId: string) {
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
    console.log(data.Items);
    if (data.Items) {
      for (let x = 0; x < data.Items.length; x++) {
        const params: AWS.DynamoDB.DocumentClient.QueryInput = {
          TableName: process.env.NOTES_TABLE!,
          KeyConditionExpression: "#pk = :pk and #sk = :sk",
          ExpressionAttributeValues: {
            ":sk": "LIKE#" + userId,
            ":pk": "NOTE#" + data.Items[x].id,
          },
          ExpressionAttributeNames: { "#sk": "sk", "#pk": "pk" },
        };
        const res = await docClient.query(params).promise();
        console.log("like query: " + res.Items?.length);
        data.Items[x].voteStatus = res.Items?.length ? true : false;
      }
    }

    console.log(data.Items);
    return data.Items;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    throw new Error("Could not get notes");
  }
}

export default listNotesByDate;
