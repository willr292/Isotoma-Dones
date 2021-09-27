import * as AWS from "aws-sdk";

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

async function listNotes() {
  const params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: process.env.NOTES_TABLE!,
    FilterExpression: "begins_with(#sk, :sortkeyval)",
    ExpressionAttributeValues: { ":sortkeyval": "USER#" },
    ExpressionAttributeNames: { "#sk": "sk" },
  };

  // TODO Check for vote status

  try {
    const data = await docClient.scan(params).promise();
    console.log(data);
    return data.Items;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    throw err; //new Error("Could not fetch Notes");
  }
}

export default listNotes;
