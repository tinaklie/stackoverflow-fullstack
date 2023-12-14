import "./QuestionItem.css";
import { Link } from "react-router-dom";
import { FragmentType, graphql, useFragment } from "../gql";
import profileIcon from "./profile-icon.svg";

const questionListFragment = graphql(/* GraphQL */ `
  fragment QuestionItem on Question {
    _id
    title
    description
    votes
  }
`);

interface Props {
  question: FragmentType<typeof questionListFragment>;
}

export const QuestionItem: React.FC<Props> = ({ question }) => {
  const questionItem = useFragment(questionListFragment, question);
  return (
    <div className="questionItem">
      <div className="reactions-col">
        <div>{questionItem.votes} votes</div>
        {/* TODO: get count of answers by id */}
        <div> ~ answers</div>
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
