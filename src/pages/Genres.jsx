import React, { useEffect, useState } from 'react';
import api from '../api/api';
import GenreFilter from './GenreFilter';
import Card from './Card';
import './Genres.css';


const Genres = () => {
  const [items, setItems] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    if (selectedGenres.length === 0) {
      setItems([]); // or fetch all content if desired
      return;
    }

    const genreQuery = selectedGenres.join(',');
    try {
      const { data } = await api.get(`/content/filter?genres=${genreQuery}`);
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch filtered content', error);
    }
  };

  fetchData();
}, [selectedGenres]);


  return (
    <div>
      <GenreFilter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      <div className="grid-list">
        {items.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Genres;