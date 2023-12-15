import "./QAItem.css";
import arrowDown from "./arrow_down.svg";
import arrowUp from "./arrow_up.svg";
import profileIcon from "../question-list/profile-icon.svg";
import { graphql } from "../gql";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

const updateQuestionDocument = graphql(/* GraphQL */ `
  mutation updateQuestion($question: QuestionInput!) {
    updateQuestion(question: $question)
  }
`);

const updateAnswerDocument = graphql(/* GraphQL */ `
  mutation updateAnswer($answer: AnswerInput!) {
    updateAnswer(answer: $answer)
  }
`);

interface Props {
  id: string;
  title?: string;
  votes: number;
  text: string;
  comments: { _id: string; text: string }[];
  type: "question" | "answer";
}

export const QAItem: React.FC<Props> = ({
  id,
  title,
  votes,
  text,
  comments,
  type,
}) => {
  const [updateQuestion] = useMutation(updateQuestionDocument);
  const [updateAnswer] = useMutation(updateAnswerDocument);
  const params = useParams();

  const votingMethods = useForm({ values: { votes: votes } });
  const { register } = votingMethods;

  function upvote() {
    console.log(type);
    vote(votingMethods.getValues().votes + 1);
  }

  function downvote() {
    vote(votingMethods.getValues().votes - 1);
  }

  function vote(votes: number) {
    if (type === "question" && title) {
      updateQuestion({
        variables: {
          question: {
            _id: id,
            title: title,
            description: text,
            comments: comments.map((comment) => ({
              _id: comment._id,
              text: comment.text,
            })),
            votes: votes,
          },
        },
      });
    } else if (params.id)
      updateAnswer({
        variables: {
          answer: {
            _id: id,
            questionId: params.id,
            text: text,
            comments: comments.map((comment) => ({
              _id: comment._id,
              text: comment.text,
            })),
            votes: votes,
          },
        },
      });
  }

  return (
    <div className="details">
      <FormProvider {...votingMethods}>
        <form>
          <div className="votes">
            <button className="voting-button" onClick={upvote}>
              <img src={arrowUp} alt="arrow up" />
            </button>
            <input className="vote-counter" {...register("votes")} readOnly />
            <button className="voting-button" onClick={downvote}>
              <img src={arrowDown} alt="arrow down" />
            </button>
          </div>
        </form>
      </FormProvider>
      <div>
        <div className="description">
          {text}
          <div className="posting-info">
            <div
              className={
                type === "question" ? "questioner-info" : "answerer-info"
              }
            >
              <img src={profileIcon} alt="profileIcon" />
              Anonymous
            </div>
          </div>
        </div>
        {comments.length > 0 ? <div className="separator-line" /> : <></>}
        {comments?.map((c) => (
          <div key={c._id}>
            <div className="comment">{c.text} - Anonymous</div>
            <div className="separator-line" />
          </div>
        ))}
        <div className="add-comment">
          <a>Add Comment</a>
        </div>
      </div>
    </div>
  );
};
