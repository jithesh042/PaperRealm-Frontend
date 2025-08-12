import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function Chapters() {
  const { type, id, chapterNum } = useParams();
  const [pdfUrl, setPdfUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/${type}/${id}/chapter/${chapterNum}`, { responseType: 'arraybuffer' })
      .then(res => {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        setPdfUrl(URL.createObjectURL(blob));
      })
      .catch(err => {
        console.error('Error loading PDF:', err);
      });
  }, [type, id, chapterNum]);

  const handleReport = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to report.');
        return;
      }

      await api.post(
        '/report',
        {
          uploadId: id,
          chapterNumber: Number(chapterNum),
          reason: 'Bad scan',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Chapter reported');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to report chapter');
    }
  };

  const cNum = Number(chapterNum);

  return (
    <div className="chapters-container">
      <div className="chapters-header">
        <h2>{type.toUpperCase()} Chapter {cNum}</h2>
        <div className="chapters-actions">
          <button disabled={cNum <= 1} onClick={() => navigate(-1)}>← Prev</button>
          <button onClick={handleReport}>Report Chapter</button>
          <button onClick={() => navigate(cNum + 1)}>Next →</button>
        </div>
      </div>
      {pdfUrl && (
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          width="100%"
          height="800px"
          style={{ border: 'none' }}
          title={`Chapter ${cNum} PDF`}
        />
      )}
    </div>

  );
}
