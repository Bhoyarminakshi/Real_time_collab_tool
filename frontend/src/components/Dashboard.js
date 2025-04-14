import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                }

                const { data } = await axios.get('http://localhost:5000/api/documents', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setDocuments(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch documents:', error);
                navigate('/');
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [navigate]);

    return (
        <>
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f4f6f9;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: fit;
                }

                .container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                }

                .dashboard-title {
                    font-size: 32px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 2rem;
                    text-align: center;
                }

                .document-cards {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                    justify-content: space-around;
                }

                .custom-card {
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    cursor: pointer;
                }

                .custom-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
                }

                .custom-card-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 10px;
                }

                .custom-card-text {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 20px;
                }

                .custom-btn {
                    background-color: #4c6ef5;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    text-align: center;
                    transition: background-color 0.3s ease;
                }

                .custom-btn:hover {
                    background-color: #3b5fdd;
                }

                .custom-create-btn {
                    background-color: #4caf50;
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: 600;
                    transition: background-color 0.3s ease;
                }

                .custom-create-btn:hover {
                    background-color: #45a049;
                }

                .loading-text {
                    font-size: 18px;
                    color: #999;
                    font-weight: 500;
                }
            `}</style>

            <div className="container">
                <h2 className="my-4 dashboard-title">My Documents</h2>
                <div className="row document-cards">
                    {loading ? (
                        <div className="col-12 text-center">
                            <p className="loading-text">Loading documents...</p>
                        </div>
                    ) : documents.length > 0 ? (
                        documents.map((doc) => (
                            <div key={doc._id} className="col-md-4 mb-4">
                                <div className="card custom-card">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title custom-card-title">{doc.title}</h5>
                                        <p className="card-text custom-card-text">
                                            Created on: {new Date(doc.createdAt).toLocaleDateString()}
                                        </p>
                                        <Link to={`/document/${doc._id}`} className="btn custom-btn mt-auto">
                                            Open Document
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No documents found</p>
                    )}
                </div>
                <div className="text-center">
                    <button
                        className="btn custom-create-btn mt-4"
                        onClick={() => navigate('/document/new')}
                    >
                        Create New Document
                    </button>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
