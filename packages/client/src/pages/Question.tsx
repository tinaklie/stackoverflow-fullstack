import "./Question.css";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { graphql } from "../gql";

const questionDocument = graphql(/* GraphQL */ `
  query GetQuestion($id: ID!) {
    questionById(id: $id) {
      _id
      title
      description
      votes
    }
  }
`);

export const Question: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery(questionDocument, { variables: { id: id! } });

  return (
    <div className="question-main">
      <h2>{data?.questionById?.title}</h2>
      <div>{data?.questionById?.description}</div>
    </div>
  );
};
