import "./Question.css";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { graphql } from "../gql";
import { QAItem } from "../question-details/QAItem";

const questionDocument = graphql(/* GraphQL */ `
  query GetQuestion($id: ID!) {
    questionById(id: $id) {
      _id
      title
      description
      comments {
        _id
        text
      }
      votes
    }
  }
`);

export const Question: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery(questionDocument, { variables: { id: id! } });

  const questionItem = data?.questionById;
  if (questionItem)
    return (
      <div className="question-main">
        <h2>{questionItem?.title}</h2>
        <div className="separator-line" />
        <QAItem votes={questionItem.votes} comments={questionItem.comments} text={questionItem.description} />
        <div className="answers">{/* <div className="question-counter"> {answers.length} questions</div> */}</div>
      </div>
    );
};
