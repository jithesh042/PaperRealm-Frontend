// import { useState, useEffect } from "react";

// const Saved = () => {
//   const [saved, setSaved] = useState([]);

//   useEffect(() => {
//     const data = localStorage.getItem("saved");
//     if (data) setSaved(JSON.parse(data));
//   }, []);

//   return (
//     <div className="saved-page">
//       <h2>Saved Reads</h2>
//       {saved.length === 0 ? (
//         <p>No saved items</p>
//       ) : (
//         <div className="card-row">
//           {saved.map((u) => (
//             <div key={u._id} className="card">
//               <img src={`http://localhost:5000/uploads/${u.image}`} alt="" />
//               <p>{u.title}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Saved;


import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Card from './Card';

const Saved = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const { data } = await api.get('/users/saved', {
        headers: { Authorization: `Bearer ${token}` }
      });
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

export default Saved;