import { Link } from "react-router-dom";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";

const questionListDocument = graphql(/* GraphQL */ `
  query GetQuestionList {
    questions {
      _id
      title
    }
  }
`);

export const Main: React.FC = () => {
  const { data } = useQuery(questionListDocument);

  return (
    <>
      <h1>Main Page</h1>
      {data?.questions.map((q) => (
        <div key={q._id}>
          <Link className={"toQuestion_" + q._id} to={"/question/" + q._id}>
            {q.title}
          </Link>
        </div>
      ))}
    </>
  );
};
