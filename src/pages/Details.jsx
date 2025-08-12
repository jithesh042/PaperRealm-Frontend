import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import CommentsList from "../compoents/CommentsList";
import CommentBox from "../compoents/CommentBox";
import ReportModal from "../compoents/ReportModal";
import EditModal from "../compoents/EditModal";
import './Details.css';


const Details = () => {
    const { id } = useParams();
    const [upload, setUpload] = useState(null);
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);

    useEffect(() => {
        api.get(`/upload/${id}`).then((res) => setUpload(res.data));
    }, [id, reload]);
    const user = JSON.parse(localStorage.getItem("user")); // current user
    const [showReport, setShowReport] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm("Delete this upload?")) return;
        await api.delete(`/upload/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        alert("Deleted");
        navigate("/profile");
    };

    return upload ? (
        <div className="details-page">
            <img src={`http://localhost:5000/uploads/${upload.image}`} alt="" />
            <h2>{upload.title}</h2>
            <p><b>Author:</b> {upload.author}</p>
            <p><b>Genres:</b> {upload.genres.join(", ")}</p>
            <p>{upload.description}</p>

            <h3>Chapters</h3>
            <ul>
                {upload.chapters.map((chap) => (
                    <li key={chap.chapterNumber} onClick={() => navigate(`/read/${upload._id}/chapter/${chap.chapterNumber}`)}>
                        Chapter {chap.chapterNumber}: {chap.chapterTitle}
                    </li>
                ))}
            </ul>

            <h4>Comments</h4>
            <div className="actions">
                <button onClick={() => setShowReport(true)}>Report</button>
                {upload.user._id === user.id && (
                    <>
                        <button onClick={() => setEditModal(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </>
                )}
                {upload.user._id === user.id && (
                    <>
                        <button onClick={() => setShowEdit(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </>
                )}
            </div>
            {showEdit && (
                <EditModal
                    upload={upload}
                    onClose={() => setShowEdit(false)}
                    onUpdated={() => setReload((r) => !r)}
                />
            )}
            <CommentBox uploadId={upload._id} onComment={() => setReload((r) => !r)} />
            <CommentsList uploadId={upload._id} />
            {showReport && (
                <ReportModal
                    uploadId={upload._id}
                    onClose={() => setShowReport(false)}
                />
            )}
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default Details;
