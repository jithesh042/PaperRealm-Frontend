import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import './Home.css';


const Home = () => {
  const [latest, setLatest] = useState([]);
  const [top, setTop] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: l } = await api.get("/upload/latest");
      const { data: t } = await api.get("/upload/top");
      setLatest(l);
      setTop(t);
    };
    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* <div className="carousel">
        <div className="slide">📚 Manhwa</div>
        <div className="slide">📖 Manga</div>
        <div className="slide">📘 Novel</div>
      </div> */}

      <h3>Latest Uploads</h3>
      <div className="card-row">
        {latest.map((u) => (
          <div key={u._id} className="card" onClick={() => navigate(`/details/${u._id}`)}>
            <img src={`http://localhost:5000/uploads/${u.image}`} alt="" />
            <p>{u.title}</p>
          </div>
        ))}
      </div>

      <h3>Top Rated</h3>
      <div className="card-row">
        {top.map((u) => (
          <div key={u._id} className="card" onClick={() => navigate(`/details/${u._id}`)}>
            <img src={`http://localhost:5000/uploads/${u.image}`} alt="" />
            <p>{u.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
