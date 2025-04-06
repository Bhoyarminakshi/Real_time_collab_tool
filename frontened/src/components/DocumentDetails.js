import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDocumentById, updateDocument, deleteDocument } from '../services/documentService';
import { io } from 'socket.io-client';

const DocumentDetails = () => {
    const socket = io('http://localhost:5000');
    const { id } = useParams();
    const navigate = useNavigate();
    const [document, setDocument] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const location = useLocation();
    const message = location.state?.message;

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const doc = await getDocumentById(id);
                setDocument(doc);
                setTitle(doc.title);
                setContent(doc.content);
            } catch (error) {
                setError('Failed to fetch document');
            }
        };
        fetchDocument();
    }, [id]);

    useEffect(() => {
        socket.emit('joinDocument', id);

        socket.on('receiveUpdate', (updatedData) => {
            if (updatedData.title) {
                setTitle(updatedData.title);
            }
            if (updatedData.content) {
                setContent(updatedData.content);
            }
        });

        socket.on('receiveUpdatedTitle', (updatedContent) => {
            setContent(updatedContent);
        });

        return () => {
            socket.disconnect();
        };
    }, [id, socket]);

    const handleUpdate = async () => {
        try {
            await updateDocument(id, { title, content });
            socket.emit('documentUpdate', { documentId: id, title, content });
            setSuccessMessage('Document updated successfully!');
            navigate(`/document/${id}`);
        } catch (error) {
            setError('Failed to update document');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDocument(id);
            navigate('/dashboard');
        } catch (error) {
            setError('Failed to delete document');
        }
    };

    if (error) return <div className="alert alert-danger text-center">{error}</div>;
    if (!document) return <div className="text-center my-5">Loading...</div>;

    return (
        <div className="container py-5" style={{ maxWidth: "700px" }}>
            {message && <div className="alert alert-success text-center">{message}</div>}

            <h2 className="mb-4 text-center fw-bold">Edit Document</h2>

            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        socket.emit('documentUpdate', { documentId: id, title: e.target.value, content });
                    }}
                    placeholder="Enter document title"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="content" className="form-label">Content</label>
                <textarea
                    id="content"
                    className="form-control"
                    rows="6"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                        socket.emit('documentUpdate', { documentId: id, title, content: e.target.value });
                    }}
                    placeholder="Start writing your content here..."
                ></textarea>
            </div>

            {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

            <div className="d-flex justify-content-between">
                <button className="btn btn-primary w-50 me-2" onClick={handleUpdate}>
                    Save Changes
                </button>
                <button className="btn btn-outline-danger w-50" onClick={handleDelete}>
                    Delete Document
                </button>
            </div>
        </div>
    );
};

export default DocumentDetails;
