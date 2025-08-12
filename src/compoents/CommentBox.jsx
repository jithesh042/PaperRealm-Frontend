import { useState } from "react";
import api from "../api/api";
import './CommentBox.css';


const CommentBox = ({ uploadId, chapterNumber = null, onComment }) => {
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await api.post(
      "/comments",
      { uploadId, chapterNumber, text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setText("");
    if (onComment) onComment();
  };

  return (
    <form className="comment-box" onSubmit={handleSubmit}>
      <textarea
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentBox;
