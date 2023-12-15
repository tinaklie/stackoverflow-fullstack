import "./QuestionItem.css";
import { Link } from "react-router-dom";
import { FragmentType, graphql, useFragment } from "../gql";
import profileIcon from "./profile-icon.svg";
import { useQuery } from "@apollo/client";

const questionListFragment = graphql(/* GraphQL */ `
  fragment QuestionItem on Question {
    _id
    title
    description
    votes
  }
`);
const answersDocument = graphql(/* GraphQL */ `
  query GetAnswersForQuestion($id: ID!) {
    answers(questionId: $id) {
      _id
    }
  }
`);

interface Props {
  question: FragmentType<typeof questionListFragment>;
}

export const QuestionItem: React.FC<Props> = ({ question }) => {
  const questionItem = useFragment(questionListFragment, question);
  const answers = useQuery(answersDocument, { variables: { id: questionItem._id } });

  return (
    <div className="questionItem">
      <div className="reactions-col">
        <div>{questionItem.votes} votes</div>
        <div> {answers.data?.answers.length} answers</div>
      </div>
      <div>
        <Link className="question" to={"/question/" + questionItem._id}>
          {questionItem.title}
        </Link>
        <div className="description-preview">{questionItem.description}</div>
        <div className="posting-info">
          <img src={profileIcon} alt="profile icon" />
          Anonymus
        </div>
      </div>
    </div>
  );
};
