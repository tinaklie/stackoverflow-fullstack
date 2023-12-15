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

const addQuestionCommentDocument = graphql(/* GraphQL */ `
  mutation addQuestionComment($comment: CommentInput!, $questionId: ID!) {
    addQuestionComment(comment: $comment, questionId: $questionId) {
      _id
    }
  }
`);
const addAnswerCommentDocument = graphql(/* GraphQL */ `
  mutation addAnswerComment($comment: CommentInput!, $answerId: ID!) {
    addAnswerComment(comment: $comment, answerId: $answerId) {
      _id
    }
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
  const [addQuestionComment] = useMutation(addQuestionCommentDocument);
  const [addAnswerComment] = useMutation(addAnswerCommentDocument);
  const params = useParams();

  const formMethods = useForm({
    values: { votes: votes, addCommentEnabled: false, commentText: "" },
  });
  const { register } = formMethods;

  function upvote() {
    console.log(type);
    vote(formMethods.getValues().votes + 1);
  }

  function downvote() {
    vote(formMethods.getValues().votes - 1);
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

  function saveComment() {
    //TODO: validation
    formMethods.setValue("addCommentEnabled", false);

    if (type === "question")
      addQuestionComment({
        variables: {
          comment: {
            _id: "",
            text: formMethods.getValues("commentText"),
          },
          questionId: id,
        },
      });
    else
      addAnswerComment({
        variables: {
          comment: {
            _id: "",
            text: formMethods.getValues("commentText"),
          },
          answerId: id,
        },
      });
  }
  // TODO : reload on comment post

  return (
    <FormProvider {...formMethods}>
      <form>
        <div className="details">
          <div className="votes">
            <button className="voting-button" onClick={upvote}>
              <img src={arrowUp} alt="arrow up" />
            </button>
            <input className="vote-counter" {...register("votes")} readOnly />
            <button className="voting-button" onClick={downvote}>
              <img src={arrowDown} alt="arrow down" />
            </button>
          </div>

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
              {formMethods.watch("addCommentEnabled") === true ? (
                <>
                  <input type="text" {...register("commentText")} />
                  <div className="comment-options">
                    <a
                      className="cancel-button"
                      onClick={() =>
                        formMethods.setValue("addCommentEnabled", false)
                      }
                    >
                      Cancel
                    </a>
                    <button className="save-button" onClick={saveComment}>
                      Save Comment
                    </button>
                  </div>
                </>
              ) : (
                <a
                  className="add-comment-button"
                  onClick={() =>
                    formMethods.setValue("addCommentEnabled", true)
                  }
                >
                  Add Comment
                </a>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
