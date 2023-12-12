export const typeDefinitions = /* GraphQL */ `
  type Query {
    questionById(id: ID!): Question
    questions: [Question!]!
  }

  type Question {
    _id: ID!
    title: String!
    description: String!
    answers: [Answer!]!
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
  }

  input AnswerInput {
    questionId: ID!
    text: String!
  }

  type Comment {
    _id: ID!
    questionId: ID!
    text: String!
  }

  input CommentInput {
    questionId: ID!
    text: String!
  }
`;
