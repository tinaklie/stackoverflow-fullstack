import { Link } from "react-router-dom";
import "./NotFound.css";

export const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1>NOT FOUND</h1>
      <Link to="/">go back</Link>
    </div>
  );
};
