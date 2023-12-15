export const typeDefinitions = /* GraphQL */ `
  type Query {
    questions: [Question!]!
    questionById(id: ID!): Question
    answers(questionId: ID!): [Answer!]!
    # answers(questionId: ID!): [Answer!]!
  }

  type Mutation {
    saveQuestion(question: QuestionInput!): ID!
    updateQuestion(question: QuestionInput!): ID
    updateAnswer(answer: AnswerInput!): ID
    addQuestionComment(comment: CommentInput!, questionId: ID!): Question
    addAnswerComment(comment: CommentInput!, answerId: ID!): Answer
  }

  type Question {
    _id: ID!
    title: String!
    description: String!
    comments: [Comment!]!
    votes: Int!
  }

  input QuestionInput {
    _id: ID!
    title: String!
    comments: [CommentInput!]!
    description: String!
    votes: Int!
  }

  type Answer {
    _id: ID!
    questionId: ID!
    text: String!
    comments: [Comment!]!
    votes: Int!
  }

  input AnswerInput {
    _id: ID!
    questionId: ID!
    comments: [CommentInput!]!
    text: String!
    votes: Int!
  }

  type Comment {
    _id: ID!
    text: String!
  }

  input CommentInput {
    _id: ID!
    text: String!
  }
`;
