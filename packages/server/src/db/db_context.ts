import { MongoClient } from "mongodb";
import { AnswerDB, QuestionDB } from "./types";

export async function connectToDb() {
  const client = await MongoClient.connect(process.env.MONGO_URL ?? "");
  const db = client.db(process.env.MONGO_DATABASE ?? "questions-sample");

  // const insertedQuestion = await db
  //   .collection<QuestionDB>("questions")
  //   .insertOne({
  //     _id: new ObjectId(),
  //     title: "How to insert a question into MongoDB?",
  //     description: "I want to insert a Question into MongoDB - How to do it?",
  //     comments: [],
  //     votes: 5,
  //   });
  // console.log("Question inserted: ", insertedQuestion.insertedId);

  // const insertedAnswer = await db.collection<AnswerDB>("answers").insertOne({
  //   _id: new ObjectId(),
  //   text: "I would suggest the following .... ",
  //   questionId: insertedQuestion.insertedId,
  //   comments: [],
  //   votes: 2,
  // });
  // console.log("Answer inserted: ", insertedAnswer.insertedId);

  // await db.collection<QuestionDB>("questions").updateOne(
  //   { _id: insertedQuestion.insertedId },
  //   {
  //     $push: {
  //       comments: {
  //         $each: [
  //           {
  //             _id: new ObjectId(),
  //             text: "This is my comment on your question :)",
  //           },
  //           { _id: new ObjectId(), text: "Another comment" },
  //         ],
  //       },
  //     },
  //   }
  // );

  // await db.collection<AnswerDB>("answers").updateOne(
  //   { _id: insertedAnswer.insertedId },
  //   {
  //     $push: {
  //       comments: {
  //         $each: [
  //           {
  //             _id: new ObjectId(),
  //             text: "This is my comment on your answer :)",
  //           },
  //           { _id: new ObjectId(), text: "Another comment here" },
  //         ],
  //       },
  //     },
  //   }
  // );

  return {
    db,
    questions: db.collection<QuestionDB>("questions"),
    answers: db.collection<AnswerDB>("answers"),
  };
}

export type DbContext = Awaited<ReturnType<typeof connectToDb>>;
