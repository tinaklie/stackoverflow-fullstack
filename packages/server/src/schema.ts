export const typeDefinitions = /* GraphQL */ `
  type Query {
    questionById(id: ID!): Question
    questions: [Question!]!
  }

  interface Question {
    _id: ID!
    title: String!
    description: String!
    answers: [Answer!]!
    comments: [Comment!]!
    votes: Int!
  }

  interface Answer {
    _id: ID!
    questionId: ID!
    text: String!
  }

  interface Comment {
    _id: ID!
    questionId: ID!
    text: String!
  }
`;
