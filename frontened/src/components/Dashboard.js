import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [search, setSearch] = useState('');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user ? user.token : null;
                const { data } = await axios.get('http://localhost:5000/api/documents', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDocuments(data);
            } catch (error) {
                console.error('Failed to fetch documents:', error);
                setShowToast(true);
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        };
        fetchDocuments();
    }, [navigate]);

    return (
        <div className="container py-5">

            {/* Custom Toast */}
            {showToast && (
                <div className="position-fixed top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 9999 }}>
                    <div className="alert alert-warning shadow" role="alert">
                        Please login first
                    </div>
                </div>
            )}

            {/* Header */}
            <h2 className="fw-bold mb-4">My Documents</h2>

            {/* Search + Button on the same row */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search documents..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ flex: 1 }}
                />
                <button className="btn btn-success flex-shrink-0" onClick={() => navigate('/document/new')}>
                    + New Document
                </button>
            </div>

            {documents.length === 0 ? (
                <p className="text-muted text-center">No documents found. Create your first document!</p>
            ) : (
                <div className="row g-4">
                    {documents
                        .filter(doc => doc.title.toLowerCase().includes(search.toLowerCase()))
                        .map((doc) => (
                            <div key={doc._id} className="col-md-4">
                                <div className="card shadow-sm h-100 position-relative">
                                    {/* Dropdown Actions */}
                                    <div className="dropdown position-absolute top-0 end-0 m-2">
                                        <button className="btn btn-sm btn-light border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            •••
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <button className="dropdown-item text-primary">Edit</button>
                                            </li>
                                            <li>
                                                <button className="dropdown-item text-danger">Delete</button>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title fw-semibold">{doc.title}</h5>
                                        <p className="card-text text-muted small mb-3">
                                            Created on: {new Date(doc.createdAt).toLocaleDateString()}
                                        </p>
                                        <Link to={`/document/${doc._id}`} className="btn btn-primary mt-auto w-100">
                                            Open Document
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
