import "./ErrorPage.css";
import { Link } from "react-router-dom";

export const ErrorPage: React.FC = () => {
  return (
    <div className="error">
      <h1>ERROR</h1>
      <div>sorry - it seems like there occured an error.</div>
      <Link to="/">go back</Link>
    </div>
  );
};
