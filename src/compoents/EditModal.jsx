// src/components/EditModal.jsx
import { useState, useEffect } from "react";
import api from "../api/api";

const EditModal = ({ upload, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    genres: [],
  });
  const token = localStorage.getItem("token");
  const genreList = ["Action","Romance","Fantasy","Comedy","Drama","Horror"];

  useEffect(() => {
    setForm({
      title: upload.title,
      author: upload.author,
      description: upload.description,
      genres: upload.genres,
    });
  }, [upload]);

  const toggleGenre = (g) => {
    setForm((f) => ({
      ...f,
      genres: f.genres.includes(g)
        ? f.genres.filter((x) => x !== g)
        : [...f.genres, g],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/upload/${upload._id}`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    onUpdated();
    onClose();
  };

  return (
    <div className="modal">
      <form className="upload-form" onSubmit={handleSubmit}>
        <h3>Edit Upload</h3>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="genre-select">
          {genreList.map((g) => (
            <span
              key={g}
              onClick={() => toggleGenre(g)}
              className={form.genres.includes(g) ? "selected" : ""}
            >
              {g}
            </span>
          ))}
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditModal;
