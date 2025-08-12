import React from 'react';
import { Link } from 'react-router-dom';
import './CardGrid.css';


export default function CardGrid({ item }) {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/details/${item._id}`);

  return (
    <div className="card" onClick={handleClick}>
      <img src={item.coverImage} alt={item.title} className="card-img" />
      <h3 className="card-title">{item.title}</h3>
      <p className="card-author">By {item.author}</p>
    </div>
  );
};

