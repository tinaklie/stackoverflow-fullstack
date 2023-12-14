import "./Main.css";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";
import { QuestionItem } from "../question-list/QuestionItem";

const questionListDocument = graphql(/* GraphQL */ `
  query GetQuestionList {
    questions {
      _id
      title
      ...QuestionItem
    }
  }
`);

export const Main: React.FC = () => {
  const { data } = useQuery(questionListDocument);

  return (
    <div className="question-list">
      <div className="questions-header">
        <h2>All Questions</h2>
        <button className="add-question-button">Ask Question</button>
      </div>
      <div className="question-counter"> {data?.questions.length} questions</div>
      {data?.questions.map((q) => (
        <div key={q._id}>
          <div className="separator-line"></div>
          <QuestionItem question={q} />
        </div>
      ))}
    </div>
  );
};
