import * as AWS from "aws-sdk";
const docClient: AWS.DynamoDB.DocumentClient =
  new AWS.DynamoDB.DocumentClient();

async function listNotesByDate(date: string) {
  const params = {
    TableName: process.env.NOTES_TABLE!,
  };
  try {
    const data = await docClient.scan(params).promise();
    const filter = new Date(date);
    // TODO make a secondary index to scan by date
    return data?.Items?.filter((x) => {
      dateMatch(new Date(x.createdAt), filter);
    });
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return null;
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
