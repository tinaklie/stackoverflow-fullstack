import "./Question.css";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { graphql } from "../gql";
import { QAItem } from "../question-details/QAItem";
import ArrowBack from "./arrow_back.svg";
import { FormProvider, useForm } from "react-hook-form";

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

const addAnswerDocument = graphql(/* GraphQL */ `
  mutation AddAnswer($answer: AnswerInput!) {
    saveAnswer(answer: $answer)
  }
`);

type FormData = {
  text: string;
};

export const Question: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery(questionDocument, { variables: { id: id! } });
  const answers = useQuery(answersDocument, { variables: { id: id! } });
  const [saveNewAnswer] = useMutation(addAnswerDocument, {
    refetchQueries: [{ query: answersDocument, variables: { id: id! } }],
  });

  const questionItem = data?.questionById;
  const answersItems = answers.data?.answers;

  const formMethods = useForm({ values: { text: "" } });
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = formMethods;

  function saveAnswer(data: FormData) {
    if (id)
      return saveNewAnswer({
        variables: {
          answer: {
            _id: "",
            text: data.text,
            votes: 0,
            questionId: id,
            comments: [],
          },
        },
        onCompleted: () => formMethods.reset(),
      });
  }

  const navigate = useNavigate();
  if (questionItem)
    return (
      <div className="question-main">
        <button className="go-back" onClick={() => navigate(-1)}>
          <img src={ArrowBack} alt="back button" />
        </button>
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
          <div className="question-counter">{answersItems?.length} answers</div>
          {answersItems?.map((a) => (
            <div className="answer-item" key={a._id}>
              <QAItem id={a._id} votes={a.votes} comments={a.comments} text={a.text} type="answer" />
              <div className="separator-line" />
            </div>
          ))}
        </div>
        <div>
          <h3>Your Answer</h3>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(saveAnswer)} className="answerform">
              <textarea rows={15} id="answertext" {...register("text")} />
              <div>
                <button type="submit" disabled={!isDirty}>
                  save
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    );
};
