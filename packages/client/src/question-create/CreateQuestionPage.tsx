import { FormProvider, useForm } from "react-hook-form";
import "./CreateQuestionPage.css";
import { graphql } from "../gql";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ArrowBack from "../pages/arrow_back.svg";

const saveQuestionDocument = graphql(/* GraphQL */ `
  mutation saveQuestion($question: QuestionInput!) {
    saveQuestion(question: $question)
  }
`);

type FormData = {
  title: string;
  description: string;
};

export const CreateQuestionPage: React.FC = () => {
  const formMethods = useForm({ values: { title: "", description: "" } });
  const {
    register,
    formState: { isDirty },
  } = formMethods;

  const navigate = useNavigate();

  const [saveNewQuestion] = useMutation(saveQuestionDocument);

  function saveQuestion(data: FormData) {
    return saveNewQuestion({
      variables: {
        question: {
          _id: "",
          title: data.title,
          comments: [],
          description: data.description,
          votes: 0,
        },
      },
      onCompleted: () => navigate(-1),
    });
  }
  return (
    <div className="editor-main">
      <button className="go-back" onClick={() => navigate(-1)}>
        <img src={ArrowBack} alt="back button" />
      </button>
      <h2>Ask a public question</h2>

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(saveQuestion)}>
          <div>
            <div>Title</div>
            <input id="title" type="text" className="title-input" {...register("title")} />
          </div>
          <div className="description">
            <div>Description</div>
            <textarea id="title" className="title-input" rows={15} {...register("description")} />
          </div>
          <button type="submit" disabled={!isDirty} className="add-question-button">
            Save Question
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
