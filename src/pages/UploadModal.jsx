import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import './UploadModal.css';


const UploadModal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genres: [],
    description: '',
    publishedYear: '',
    image: null,
    pdf: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenres = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, genres: [...formData.genres, value] });
    } else {
      setFormData({ ...formData, genres: formData.genres.filter((g) => g !== value) });
    }
  };

  const handleFile = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append('type', formData.type); // required by your schema
  data.append('title', formData.title);
  data.append('author', formData.author);
  data.append('description', formData.description);
  data.append('publishedYear', formData.publishedYear);
  data.append('genres', formData.genres.join(',')); // backend expects CSV
  data.append('image', formData.image); // multer field: image
  data.append('chapter', formData.pdf); // multer field: chapter

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to upload.');
      return;
    }

    await api.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`, // protect middleware requires Bearer
      },
    });

    alert('Uploaded successfully!');
    navigate('/profile');
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'Upload failed');
  }
};


  return (
    <div className="form-container">
      <h2>Upload New Item</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />

        <label>Genres:</label>
        {['Action', 'Romance', 'Fantasy', 'Comedy', 'Horror'].map((g) => (
          <label key={g}>
            <input type="checkbox" value={g} onChange={handleGenres} /> {g}
          </label>
        ))}

        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input name="publishedYear" placeholder="Published Year" type="number" value={formData.publishedYear} onChange={handleChange} required />

        <label>Cover Image:</label>
        <input type="file" accept="image/*" name="image" onChange={handleFile} required />

        <label>Chapter PDF:</label>
        <input type="file" accept="application/pdf" name="pdf" onChange={handleFile} required />
        <label>Type:</label>
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="manga">Manga</option>
          <option value="manhwa">Manhwa</option>
          <option value="novel">Novel</option>
        </select>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadModal;
