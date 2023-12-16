import { AnswerDB, CommentDB, QuestionDB } from "./db/types";
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
    saveAnswer: async (_root, { answer }, { db }) => {
      const inserted = await db.answers.insertOne({
        _id: new ObjectId(),
        text: answer.text,
        questionId: new ObjectId(answer.questionId),
        votes: 0,
        comments: [],
      });
      return inserted.insertedId.toHexString();
    },
    updateQuestion: async (_root, { question }, { db }) => {
      const questionDB: QuestionDB = {
        _id: new ObjectId(question._id),
        title: question.title,
        comments: question.comments.map((c) => ({
          _id: new ObjectId(c._id),
          text: c.text,
        })),
        description: question.description,
        votes: question.votes,
      };

      const updated = await db.questions.replaceOne(
        { _id: new ObjectId(question._id) },
        questionDB,
        {
          upsert: true,
        }
      );
      return updated.upsertedId?.toHexString();
    },
    updateAnswer: async (_root, { answer }, { db }) => {
      const answerDB: AnswerDB = {
        _id: new ObjectId(answer._id),
        text: answer.text,
        questionId: new ObjectId(answer.questionId),
        comments: answer.comments.map((c) => ({
          _id: new ObjectId(c._id),
          text: c.text,
        })),
        votes: answer.votes,
      };
      const updated = await db.answers.replaceOne(
        { _id: new ObjectId(answer._id) },
        answerDB,
        {
          upsert: true,
        }
      );
      return updated.upsertedId?.toHexString();
    },
    addQuestionComment: async (_root, { comment, questionId }, { db }) => {
      const newComment: CommentDB = {
        _id: new ObjectId(),
        text: comment.text,
      };

      await db.questions.updateOne(
        { _id: new ObjectId(questionId) },
        { $push: { comments: newComment } }
      );

      return db.questions.findOne({ _id: new ObjectId(questionId) });
    },
    addAnswerComment: async (_root, { comment, answerId }, { db }) => {
      const newComment: CommentDB = {
        _id: new ObjectId(),
        text: comment.text,
      };

      await db.answers.updateOne(
        { _id: new ObjectId(answerId) },
        { $push: { comments: newComment } }
      );

      return db.answers.findOne({ _id: new ObjectId(answerId) });
    },
  },
};
