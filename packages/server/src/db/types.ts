import { ObjectId } from "mongodb";

export interface QuestionDB {
  _id: ObjectId;
  title: string;
  description: string;
  answers: AnswerDB[];
  comments: CommentDB[];
  votes: number;
}

export interface AnswerDB {
  _id: ObjectId;
  questionId: ObjectId;
  text: string;
}

export interface CommentDB {
  _id: ObjectId;
  questionId: ObjectId;
  text: string;
}
