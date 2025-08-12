import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/details/${item._id}`);

  return (
    <div className="card" onClick={handleClick}>
      <img
        src={`http://localhost:5000/uploads/${item.image}`} // ✅ use correct path
        alt={item.title}
        className="card-img"
      />
      <h3 className="card-title">{item.title}</h3>
      <p className="card-author">By {item.author}</p>
    </div>
  );
};

export default Card;
