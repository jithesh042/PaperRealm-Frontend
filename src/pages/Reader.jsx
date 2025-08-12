import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import CommentsList from "../compoents/CommentsList";
import CommentBox from "../compoents/CommentBox";
import ReportModal from "../compoents/ReportModal";

const Reader = () => {
    const { id, number } = useParams();
    const [chapter, setChapter] = useState(null);
    const [upload, setUpload] = useState(null);
    const [showReport, setShowReport] = useState(false); // ✅ added
    const navigate = useNavigate();
    const [reload, setReload] = useState(false);

    useEffect(() => {
        api.get(`/upload/${id}`).then((res) => setUpload(res.data));
        api.get(`/upload/${id}/chapter/${number}`).then((res) => setChapter(res.data));
    }, [id, number, reload]);

    const prev = () => navigate(`/read/${id}/chapter/${parseInt(number) - 1}`);
    const next = () => navigate(`/read/${id}/chapter/${parseInt(number) + 1}`);

    return chapter && upload ? (
        <div className="reader-page">
            <h2>{upload.title} - Chapter {chapter.chapterNumber}</h2>
            <div className="pdf-viewer">
                <iframe
                    src={`http://localhost:5000/uploads/${chapter.pdfFile}`}
                    width="100%"
                    height="600px"
                    title="Chapter PDF"
                />
            </div>
            <div className="nav-buttons">
                {chapter.chapterNumber > 1 && <button onClick={prev}>← Prev</button>}
                {chapter.chapterNumber < upload.chapters.length && <button onClick={next}>Next →</button>}
            </div>
            <div className="actions">
                <button onClick={() => setShowReport(true)}>Report Chapter</button>
            </div>

            <h4>Comments</h4>
            <CommentBox
                uploadId={upload._id}
                chapterNumber={chapter.chapterNumber}
                onComment={() => setReload((r) => !r)}
            />
            <CommentsList
                uploadId={upload._id}
                chapterNumber={chapter.chapterNumber}
            />

            {showReport && (
                <ReportModal
                    uploadId={upload._id}
                    chapterNumber={chapter.chapterNumber}
                    onClose={() => setShowReport(false)}
                />
            )}
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default Reader;
