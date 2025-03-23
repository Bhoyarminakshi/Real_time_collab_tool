import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
            <div className="card shadow p-5 bg-white w-100" style={{ maxWidth: "700px" }}>
                <h1 className="display-5 fw-bold mb-4 text-primary">Welcome to CollabTool</h1>
                <p className="lead mb-3">
                    Collaborate in real-time with your team on documents, share ideas, and boost productivity!
                </p>
                <p className="text-muted mb-4">
                    Whether you are working remotely or in-house, CollabTool empowers your workflow with simple, fast, and effective tools.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/register" className="btn btn-primary btn-lg px-4">Get Started</Link>
                    <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
