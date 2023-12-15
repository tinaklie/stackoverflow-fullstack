export const typeDefinitions = /* GraphQL */ `
  type Query {
    questions: [Question!]!
    questionById(id: ID!): Question
    answers(questionId: ID!): [Answer!]!
    # answers(questionId: ID!): [Answer!]!
  }

  type Mutation {
    saveQuestion(question: QuestionInput!): ID!
  }

  type Question {
    _id: ID!
    title: String!
    description: String!
    comments: [Comment!]!
    votes: Int!
  }

  input QuestionInput {
    title: String!
    description: String!
  }

  type Answer {
    _id: ID!
    questionId: ID!
    text: String!
    comments: [Comment!]!
    votes: Int!
  }

  input AnswerInput {
    questionId: ID!
    text: String!
    votes: Int!
  }

  type Comment {
    _id: ID!
    text: String!
  }

  input CommentInput {
    text: String!
  }
`;
