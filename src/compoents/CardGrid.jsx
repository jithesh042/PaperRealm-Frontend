import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardGrid.css';

export default function CardGrid({ item }) {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/details/${item._id}`);

  const imageUrl = item.coverImage?.startsWith('http')
    ? item.coverImage
    : `${import.meta.env.VITE_URL}/${item.coverImage}`;

  return (
    <div className="card" onClick={handleClick}>
      <img src={imageUrl} alt={item.title} className="card-img" />
      <h3 className="card-title">{item.title}</h3>
      <p className="card-author">By {item.author}</p>
    </div>
  );
};
