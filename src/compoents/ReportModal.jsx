// src/components/ReportModal.jsx
import { useState } from "react";
import api from "../api/api";
import './ReportModal.css';


const ReportModal = ({ uploadId, chapterNumber = null, onClose }) => {
  const [reason, setReason] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) return;
    await api.post(
      "/reports",
      { uploadId, chapterNumber, reason },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Report submitted");
    onClose();
  };

  return (
    <div className="modal">
      <form className="report-form" onSubmit={handleSubmit}>
        <h3>Report {chapterNumber ? `Chapter ${chapterNumber}` : "Upload"}</h3>
        <textarea
          placeholder="Reason for reporting..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <button type="submit">Submit Report</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ReportModal;
