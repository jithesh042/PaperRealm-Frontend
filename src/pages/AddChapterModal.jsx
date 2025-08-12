import { useState } from "react";
import api from "../api/api";
import './AddChapterModal.css';


export default function AddChapterModal({ uploadId, onClose }) {
  const [chapterNumber, setChapterNumber] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [image, setImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("chapterNumber", chapterNumber);
    formData.append("chapterTitle", chapterTitle);
    if (image) formData.append("image", image);
    if (pdfFile) formData.append("pdfFile", pdfFile);

    try {
       const token = localStorage.getItem("token");
      await api.post(`/upload/${uploadId}/chapter`, formData, {
         headers: {
    Authorization: `Bearer ${token}`, 
    "Content-Type": "multipart/form-data"
  }
      });
      onClose(); // close and refresh
    } catch (err) {
      console.error("Failed to add chapter", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Chapter</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Chapter Number"
            value={chapterNumber}
            onChange={(e) => setChapterNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Chapter Title"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
            required
          />
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <label>PDF File:</label>
          <input type="file" onChange={(e) => setPdfFile(e.target.files[0])} />
          <button type="submit">Save Chapter</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
