import { ObjectId } from "mongodb";

export interface QuestionDB {
  _id: ObjectId;
  title: string;
  description: string;
  comments: CommentDB[];
  votes: number;
}

export interface AnswerDB {
  _id: ObjectId;
  questionId: ObjectId;
  text: string;
  comments: CommentDB[];
  votes: number;
}

export interface CommentDB {
  _id: ObjectId;
  text: string;
}
