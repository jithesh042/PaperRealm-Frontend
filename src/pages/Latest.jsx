import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Card from './Card';

const Latest = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
  const { data } = await api.get('/upload/latest'); // ✅ matches backend
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

export default Latest;
