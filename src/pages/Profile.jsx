import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import UploadModal from "./UploadModal";
import AddChapterModal from "./AddChapterModal";
import './Profile.css'

const Profile = () => {
  const [user, setUser] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [selectedUploadId, setSelectedUploadId] = useState(null);

  const navigate = useNavigate();
  const fetchUploads = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.get("/upload/my-uploads", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUploads(data);
    } catch (err) {
      console.error("Error fetching uploads:", err);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return navigate("/login");
    setUser(JSON.parse(stored));
    fetchUploads();
  }, []);

  const handleDelete = async (id, type = "upload", parentId = null) => {
    const confirmMsg =
      type === "upload"
        ? "Are you sure you want to delete this upload?"
        : "Are you sure you want to delete this chapter?";

    if (window.confirm(confirmMsg)) {
      try {
        if (type === "upload") {
          await api.delete(`/upload/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setUploads((prev) => prev.filter((u) => u._id !== id));
        } else if (type === "chapter") {
          await api.delete(`/upload/${parentId}/chapter/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setUploads((prev) =>
            prev.map((u) =>
              u._id === parentId
                ? { ...u, chapters: u.chapters.filter((c) => c._id !== id) }
                : u
            )
          );
        }
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
  };


  const openChapterModal = (id) => {
    setSelectedUploadId(id);
    setShowChapterModal(true);
  };

  const closeChapterModal = () => {
    setShowChapterModal(false);
    setSelectedUploadId(null);
    fetchUploads();
  };

  return (
    <div className="profile-page">
      <h2>Welcome, {user?.name}</h2>
      <button onClick={() => setShowModal(true)}>Upload</button>

      {uploads.length > 0 && (
        <div className="user-uploads">
          <h3>Your Uploads</h3>
          <div className="upload-grid">
            {uploads.map((upload) => (
              <div key={upload._id} className="upload-card">
                {/* <img src={`/uploads/images/${upload.image}`} alt={upload.title} /> */}
                <div>
                  <h4>{upload.title}</h4>
                  <p>{upload.author}</p>
                  <p>{upload.genres.join(", ")}</p>

                  <button onClick={() => handleDelete(upload._id)}>Delete</button>
                  <button onClick={() => openChapterModal(upload._id)}>Add Chapter</button>
                </div>

                {/* Display chapters inline without leaving profile */}
                {upload.chapters?.length > 0 && (
                  <div className="chapter-list">
                    <h5>Chapters</h5>
                    {upload.chapters.map((chapter) => (
                      <div key={chapter._id} className="chapter-item">
                        <span>{chapter.chapterTitle}</span>
                        <a
                          href={`/uploads/chapters/${chapter.pdfFile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View PDF
                        </a>
                        {/* <button
                          onClick={() =>
                            handleDelete(chapter._id, "chapter", upload._id)
                          }
                        >
                          Delete Chapter
                        </button> */}
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <UploadModal
          onClose={() => {
            setShowModal(false);
            fetchUploads();
          }}
          userId={user?.id}
        />
      )}

      {showChapterModal && (
        <AddChapterModal
          uploadId={selectedUploadId}
          onClose={closeChapterModal}
        />
      )}
    </div>
  );
};

export default Profile;
