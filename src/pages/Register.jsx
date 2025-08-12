import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    favoriteGenres: [],
  });
  const navigate = useNavigate();
  const genresList = ["Action", "Romance", "Fantasy", "Comedy", "Drama", "Horror"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/profile");
    } catch (err) {
      alert("Registration failed");
    }
  };

  const toggleGenre = (g) => {
    if (form.favoriteGenres.includes(g)) {
      setForm({ ...form, favoriteGenres: form.favoriteGenres.filter((x) => x !== g) });
    } else {
      setForm({ ...form, favoriteGenres: [...form.favoriteGenres, g] });
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <div className="genre-select">
          {genresList.map((g) => (
            <span
              key={g}
              className={form.favoriteGenres.includes(g) ? "selected" : ""}
              onClick={() => toggleGenre(g)}
            >
              {g}
            </span>
          ))}
        </div>
        <button type="submit">Register</button>
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
