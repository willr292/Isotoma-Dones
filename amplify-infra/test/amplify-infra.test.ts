import { DocumentClient } from "aws-sdk/clients/dynamodb";
import createNote from "../lambda-fns/createNote";
import listNotes from "../lambda-fns/listNotes";
import { NoteInput } from "../lambda-fns/Note";
import * as uuid from "uuid";
import addCommentInput from "../lambda-fns/Comment";
import addComment from "../lambda-fns/addComment";
import getCommentsbyNoteId from "../lambda-fns/getCommentsByNoteId";
import { addLikeInput } from "../lambda-fns/Like";
import addLike from "../lambda-fns/addLike";
jest.mock("uuid");

const isTest = process.env.JEST_WORKER_ID;
const config = {
  ...(isTest && {
    endpoint: "localhost:8000",
    sslEnabled: false,
    region: "local-env",
  }),
};

const ddb = new DocumentClient(config);

beforeAll(() => {
  process.env = Object.assign(process.env, {
    NOTES_TABLE: "NOTES_TABLE",
  });
});

beforeEach(async () => {
  const clearAllTableItems = async (TableName: string): Promise<void> => {
    const tableItems = await ddb.scan({ TableName }).promise();
    if (!tableItems) return;
    if (!tableItems.Items) return;

    if (tableItems.Items?.length > 0) {
      for (let i = 0; i < tableItems.Items.length; i += 1) {
        const tableItem = tableItems.Items[i];
        try {
          const params = {
            TableName,
            Key: { PK: tableItem.PK, SK: tableItem.SK },
          };
          await ddb.delete(params).promise();
        } catch (err) {
          console.log("Error clearing table", err);
        }
      }
    }
  };

  await clearAllTableItems("NOTES_TABLE");
});

describe("notes", () => {
  it("returns empty list when no records", async () => {
    const result = await listNotes();
    expect(result).toStrictEqual([]);
  });

  it("returns note when note created", async () => {
    const note: NoteInput = { description: "test", creator: "12345" };
    const now = new Date();
    const anonymousId = "testid";
    jest.spyOn(uuid, "v4").mockReturnValue(anonymousId);

    const create = await createNote(note);
    const result = await listNotes();

    expect(create).toStrictEqual("Note Created successfully");
    expect(result).toStrictEqual([
      {
        createdAt: now.toISOString().split("T")[0],
        score: 0,
        creator: "12345",
        sk: "USER#12345",
        description: "test",
        pk: "NOTE#testid",
        id: "testid",
      },
    ]);
  });

  it("returns comment when note and comment created", async () => {
    const note: NoteInput = { description: "test", creator: "12345" };
    const comment: addCommentInput = {
      noteId: "testid",
      creator: "12345",
      content: "testing",
    };
    const now = new Date();
    const anonymousId = "testid";
    jest.spyOn(uuid, "v4").mockReturnValue(anonymousId);

    await createNote(note);
    const create = await addComment(comment);
    const result = await getCommentsbyNoteId(anonymousId);

    expect(create).toStrictEqual("comment added");
    expect(result).toStrictEqual([
      {
        content: "testing",
        creator: "12345",
        id: "testid",
        noteId: "testid",
        pk: "NOTE#testid",
        sk: "COMMENT#testid",
      },
    ]);
  });

  it("updates score when like added", async () => {
    const note: NoteInput = { description: "test", creator: "12345" };
    const like: addLikeInput = {
      noteId: "testid",
      creator: "12345",
    };
    const now = new Date();
    const anonymousId = "testid";
    jest.spyOn(uuid, "v4").mockReturnValue(anonymousId);

    await createNote(note);
    const create = await addLike(like);
    const result = await listNotes();

    expect(create).toStrictEqual("like added");
    expect(result).toStrictEqual([
      {
        createdAt: now.toISOString().split("T")[0],
        score: 1,
        creator: "12345",
        sk: "USER#12345",
        description: "test",
        pk: "NOTE#testid",
        id: "testid",
      },
    ]);
  });
});
