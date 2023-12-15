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

const answersDocument = graphql(/* GraphQL */ `
  query GetAnswers($id: ID!) {
    answers(questionId: $id) {
      _id
      text
      comments {
        _id
        text
      }
      votes
    }
  }
`);

// const answersDocument = graphql(/* GraphQL */ ``);

export const Question: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery(questionDocument, { variables: { id: id! } });
  const answers = useQuery(answersDocument, { variables: { id: id! } });

  const questionItem = data?.questionById;
  const answersItems = answers.data?.answers;
  if (questionItem)
    return (
      <div className="question-main">
        <h2>{questionItem?.title}</h2>
        <div className="separator-line" />
        <QAItem
          id={questionItem._id}
          title={questionItem.title}
          votes={questionItem.votes}
          comments={questionItem.comments}
          text={questionItem.description}
          type="question"
        />
        <div className="answers">
          <div className="question-counter">
            {answersItems?.length} questions
          </div>
          {answersItems?.map((a) => (
            <div className="answer-item" key={a._id}>
              <QAItem
                id={a._id}
                votes={a.votes}
                comments={a.comments}
                text={a.text}
                type="answer"
              />
              <div className="separator-line" />
            </div>
          ))}
        </div>
      </div>
    );
};
