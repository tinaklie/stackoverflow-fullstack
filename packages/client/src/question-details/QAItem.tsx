import "./QAItem.css";
import arrowDown from "./arrow_down.svg";
import arrowUp from "./arrow_up.svg";
import profileIcon from "../question-list/profile-icon.svg";
import { graphql } from "../gql";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

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
    values: {
      votes: votes,
      addCommentEnabled: false,
      commentText: "",
      item: params,
    },
  });

  function upvote() {
    vote(votes + 1);
  }

  function downvote() {
    vote(votes - 1);
  }

  async function vote(votes: number) {
    if (type === "question" && title) {
      await updateQuestion({
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
      await updateAnswer({
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

  async function saveComment() {
    //TODO: validation
    const newComment = { _id: "", text: watch("commentText") };
    append(newComment);
    setValue("commentText", "");
    if (type === "question")
      await addQuestionComment({
        variables: {
          comment: newComment,
          questionId: id,
        },
      });
    else
      await addAnswerComment({
        variables: {
          comment: newComment,
          answerId: id,
        },
      });
  }

  const {
    control,
    register,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      votes,
      addCommentEnabled: false,
      commentText: "",
      item: params,
      comments: comments,
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "comments",
  });

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
            {comments?.length > 0 ? <div className="separator-line" /> : <></>}
            {fields?.map((c) => (
              <div key={c._id}>
                <div className="comment">{c.text} - Anonymous</div>
                <div className="separator-line" />
              </div>
            ))}
            <div className="add-comment">
              {watch("addCommentEnabled") === true ? (
                <>
                  <input type="text" {...register("commentText")} />
                  <div className="comment-options">
                    <a
                      className="cancel-button"
                      onClick={() => setValue("addCommentEnabled", false)}
                    >
                      Cancel
                    </a>
                    <button
                      className="save-button"
                      onClick={saveComment}
                      disabled={!isDirty}
                    >
                      Save Comment
                    </button>
                  </div>
                </>
              ) : (
                <a
                  className="add-comment-button"
                  onClick={() => setValue("addCommentEnabled", true)}
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
