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

async function getCommentsbyNoteId(noteId: string) {
  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.NOTES_TABLE!,
    KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sortkeyval)",
    ExpressionAttributeValues: {
      ":sortkeyval": "COMMENT#",
      ":pk": "NOTE#" + noteId,
    },
    ExpressionAttributeNames: { "#sk": "sk", "#pk": "pk" },
  };

  try {
    const data = await docClient.query(params).promise();
    console.log("comments:" + data.Items);
    return data.Items;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    throw new Error("Could not fetch Comments");
  }
}

export default getCommentsbyNoteId;
