import "./QuestionList.css";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";
import { QuestionItem } from "../question-list/QuestionItem";
import { useNavigate } from "react-router-dom";

const questionListDocument = graphql(/* GraphQL */ `
  query GetQuestionList {
    questions {
      _id
      title
      ...QuestionItem
    }
  }
`);

export const QuestionList: React.FC = () => {
  const { data } = useQuery(questionListDocument);
  const navigate = useNavigate();

  return (
    <div className="question-list">
      <div className="questions-header">
        <h2>All Questions</h2>
        <button
          className="add-question-button"
          onClick={() => navigate("/question/ask")}
        >
          Ask Question
        </button>
      </div>
      <div className="question-counter">
        {data?.questions.length} questions
      </div>
      {data?.questions.map((q) => (
        <div key={q._id}>
          <div className="separator-line" />
          <QuestionItem question={q} />
        </div>
      ))}
    </div>
  );
};
