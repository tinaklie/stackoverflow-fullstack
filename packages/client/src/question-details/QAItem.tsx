import "./QAItem.css";
import arrowDown from "./arrow_down.svg";
import arrowUp from "./arrow_up.svg";
import profileIcon from "../question-list/profile-icon.svg";

interface Props {
  votes: number;
  text: string;
  comments: { _id: string; text: string }[];
  type: "question" | "answer";
}

export const QAItem: React.FC<Props> = ({ votes, text, comments, type }) => {
  return (
    <div className="details">
      <div className="votes">
        <img src={arrowUp} alt="arrow up" />
        {votes}
        <img src={arrowDown} alt="arrow down" />
      </div>
      <div>
        <div className="description">
          {text}
          <div className="posting-info">
            <div className={type === "question" ? "questioner-info" : "answerer-info"}>
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
