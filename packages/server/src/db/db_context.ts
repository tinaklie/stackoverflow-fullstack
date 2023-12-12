import { MongoClient } from "mongodb";
import { QuestionDB } from "./types";

export async function connectToDb() {
  const client = await MongoClient.connect(process.env.MONGO_URL ?? "");
  const db = client.db(process.env.MONGO_DATABASE ?? "questions-sample");

  // const inserted = await db.collection<QuestionDB>("questions").insertOne({
  //   _id: new ObjectId(),
  //   title: "How to insert a question into MongoDB?",
  //   description: "I want to insert a Question into MongoDB - How to do it?",
  //   answers: [],
  //   comments: [],
  //   votes: 0,
  // });

  // console.log(inserted.insertedId);
  return {
    db,
    questions: db.collection<QuestionDB>("questions"),
  };
}

export type DbContext = Awaited<ReturnType<typeof connectToDb>>;
