import { FormProvider, useForm } from "react-hook-form";
import "./CreateQuestionPage.css";

export const CreateQuestionPage: React.FC = () => {
  const formMethods = useForm({ values: { title: "", description: "" } });
  const {
    formState: { isDirty },
  } = formMethods;

  function saveQuestion() {
    // TODO
  }
  return (
    <div className="editor-main">
      <h2>Ask a public question</h2>

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(saveQuestion)}>
          <div>
            <div>Title</div>
            <input id="title" type="text" className="title-input" />
          </div>
          <div className="description">
            <div>Description</div>
            <textarea id="title" className="title-input" rows={15} />
          </div>
          <button type="submit" disabled={!isDirty} className="add-question-button">
            Save Question
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
