import { Link } from "react-router-dom";

const Main = () => {
  return (
    <>
      <h1>Main Page</h1>
      <Link className="toQuestion" to="/question">
        to Question
      </Link>
    </>
  );
};

export default Main;
