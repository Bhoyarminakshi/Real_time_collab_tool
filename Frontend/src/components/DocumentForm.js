import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DocumentForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user ? user.token : null;
            const { data } = await axios.post('http://localhost:5000/api/documents', { title, content }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate(`/document/${data._id}`, { state: { message: 'Document created successfully!' } });
        } catch (error) {
            console.error('Failed to create document:', error);
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: "600px" }}>
            <h2 className="text-center fw-bold mb-4">Create New Document</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter document title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        id="content"
                        rows="6"
                        placeholder="Write your content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-success w-100">Create Document</button>
            </form>
        </div>
    );
};

export default DocumentForm;
