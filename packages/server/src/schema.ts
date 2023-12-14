export const typeDefinitions = /* GraphQL */ `
  type Query {
    questionById(id: ID!): Question
    questions: [Question!]!
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
    votes: Int!
  }

  type Answer {
    _id: ID!
    questionId: ID!
    text: String!
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
