import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Card from './Card';
// import './MangaList.css';

const NovelList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
 const fetchData = async () => {
  const { data } = await api.get('/content/novel'); // ✅ will work now
  setItems(data);
};
  fetchData();
}, []);


  return (
    <div className="grid-list">
      {items.map((item) => (
        <Card key={item._id} item={item} />
      ))}
    </div>
  );
};

export default NovelList;