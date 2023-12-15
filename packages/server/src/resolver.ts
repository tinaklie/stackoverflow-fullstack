import { Resolvers } from "./generated.types";
import { ObjectId } from "mongodb";

export const resolvers: Resolvers = {
  Query: {
    questions: async (_root, _args, { db }) => {
      return db.questions.find().toArray();
    },
    questionById: async (_root, { id }, { db }) => {
      return db.questions.findOne({ _id: new ObjectId(id) });
    },
    answers: async (_root, { questionId }, { db }) => {
      return db.answers
        .find({ questionId: new ObjectId(questionId) })
        .sort({ votes: -1 })
        .toArray();
    },
  },
  Mutation: {
    saveQuestion: async (_root, { question }, { db }) => {
      const inserted = await db.questions.insertOne({
        _id: new ObjectId(),
        title: question.title,
        description: question.description,
        votes: 0,
        comments: [],
      });
      return inserted.insertedId.toHexString();
    },
  },
};
