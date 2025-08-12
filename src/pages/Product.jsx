// pages/Product.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function Product() {
  const { type, id } = useParams(); // route: /product/:type/:id
  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/${type}/${id}`).then(r => setItem(r.data));
    api.get(`/comment/${type}/${id}`).then(r => setComments(r.data));
  }, [type, id]);

  const handleReport = () =>
    api.post(`/report/${type}/${id}`, { reason: 'Inappropriate content' })
      .then(() => alert('Reported!'));

  const postComment = () => {
    api.post(`/comment/${type}/${id}`, { text: commentText })
      .then(r => setComments([...comments, r.data]));
  };

  if (!item) return null;
  return (
    <div>
      <h1>{item.title}</h1>
      <p><strong>Author:</strong> {item.author}</p>
      <p>{item.description}</p>
      <button onClick={handleReport}>Report</button>

      <h3>Chapters</h3>
      <div className="chapters-list">
        {Array.from({ length: item.chaptersCount }).map((_, i) => (
          <button key={i} onClick={() => navigate(`/chapters/${type}/${id}/${i+1}`)}>
            Chapter {i+1}
          </button>
        ))}
      </div>

      <hr />

      {localStorage.getItem('token') && (
        <div>
          <h3>Comments</h3>
          <textarea
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
          <button onClick={postComment}>Post</button>

          {comments.map(c => (
            <div key={c._id}>
              <strong>{c.author.username}</strong>: {c.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
