import React from 'react';
import './GenreFilter.css';


const genresList = [
  'Action', 'Romance', 'Fantasy', 'Horror', 'Sci-Fi', 'Drama', 'Adventure', 'Comedy', 'Mystery', 'Thriller'
];

const GenreFilter = ({ selectedGenres, setSelectedGenres }) => {
  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="genre-filter">
      {genresList.map(genre => (
        <button
          key={genre}
          className={selectedGenres.includes(genre) ? 'active' : ''}
          onClick={() => toggleGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;