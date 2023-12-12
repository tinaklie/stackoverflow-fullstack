import { MongoClient } from "mongodb";
import { AnswerDB, QuestionDB } from "./types";

export async function connectToDb() {
  console.log("process.env", process.env.MONGO_URL);
  const client = await MongoClient.connect(process.env.MONGO_URL ?? "");
  const db = client.db(process.env.MONGO_DATABASE ?? "questions-sample");
  return {
    db,
    questions: db.collection<QuestionDB>("questions"),
    answers: db.collection<AnswerDB>("answers"),
  };
}

export type DbContext = Awaited<ReturnType<typeof connectToDb>>;
