import { useEffect, useState } from "react";
import api from "../api/api";
import './CommentsList.css';


const CommentsList = ({ uploadId, chapterNumber = null }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const params = { uploadId };
      if (chapterNumber !== null) params.chapterNumber = chapterNumber;
      const { data } = await api.get("/comments", { params });
      setComments(data);
    };
    fetch();
  }, [uploadId, chapterNumber]);

  return (
    <div className="comments-list">
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map((c) => (
        <div key={c._id} className="comment-item">
          <strong>{c.user.name}</strong> <small>— {new Date(c.createdAt).toLocaleString()}</small>
          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
