import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Card from './Card';
import './MangaList.css';

const MangaList = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get('/content/manga'); // ✅ will work now
      setItems(data);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get('/content/manhwa'); // ✅ will work now
      setItem(data);
    };
    fetchData();
  }, []);


  return (
    <div>
      <section>
        <h1>Manga</h1>
        <div className="grid-list">
          {items.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </section>

      <section>
        <h1>Manhwa</h1>
        <div className="manhwa-list">
          {item.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );

};

export default MangaList;
