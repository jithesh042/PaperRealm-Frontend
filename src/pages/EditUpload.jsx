import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUpload = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '', author: '', genres: '', description: '', publishedYear: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/uploads/my`)
      .then(res => {
        const found = res.data.find(u => u._id === id);
        if (found) {
          setForm({
            title: found.title,
            author: found.author,
            genres: found.genres.join(','),
            description: found.description,
            publishedYear: found.publishedYear,
          });
        }
      });
  }, [id]);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`/api/uploads/${id}`, form);
    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Author" />
      <input name="genres" value={form.genres} onChange={handleChange} placeholder="Genres (comma separated)" />
      <input name="publishedYear" value={form.publishedYear} onChange={handleChange} placeholder="Year" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditUpload;
