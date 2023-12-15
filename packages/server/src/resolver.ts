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
    // answers: async (_root, args, { db }) => {
    //   console.log(args);
    //   const answers = db.answers.find({ questionId: new ObjectId(args.questionId) }).toArray();
    //   return answers;
    // },
    //   return db.questions
    //     .aggregate<Answer>([
    //       { $match: { _id: new ObjectId(id) } },
    //       {
    //         $lookup: {
    //           from: "answers",
    //           localField: "_id",
    //           foreignField: "questionId",
    //           as: "questionAnswers",
    //         },
    //       },
    //       { $unwind: "$questionAnswers" },
    //       { $project: { _id: "$questionAnswers._id", ansers: "$questionAnswers" } },
    //     ])
    //     .toArray();
    // },
  },
};
