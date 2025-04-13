import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <>
            <style>
                {`
                body {
                    margin: 0;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(to right, #f8f9fa, #eef1f8);
                }

                .landing-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }

                .landing-card {
                    background: white;
                    padding: 3rem;
                    border-radius: 15px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                    max-width: 700px;
                    width: 100%;
                    text-align: center;
                    animation: fadeIn 0.6s ease-in-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .landing-heading {
                    font-size: 42px;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    background: linear-gradient(45deg, #4c6ef5, #5a3f37);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    letter-spacing: 1px;
                }

                .landing-paragraph {
                    font-size: 16px;
                    color: #444;
                    margin-bottom: 1rem;
                    line-height: 1.6;
                }

                .landing-buttons {
                    margin-top: 2rem;
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                }

                .landing-button {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    color: white;
                }

                .btn-register {
                    background-color: #4c6ef5;
                }

                .btn-register:hover {
                    background-color: #3b5fdd;
                }

                .btn-login {
                    background-color: #6c757d;
                }

                .btn-login:hover {
                    background-color: #5a6268;
                }
                `}
            </style>

            <div className="landing-container">
                <div className="landing-card">
                    <h1 className="landing-heading">Welcome to CollabTool</h1>
                    <p className="landing-paragraph">
                        CollabTool is your go-to platform for seamless real-time collaboration.
                        Work together on documents, share ideas, and communicate effortlessly with your team.
                    </p>
                    <p className="landing-paragraph">
                        Whether you're working on a team project or organizing your thoughts, 
                        CollabTool provides everything you need to stay productive and connected.
                    </p>
                    <div className="landing-buttons">
                        <Link to="/register" className="landing-button btn-register">Register</Link>
                        <Link to="/login" className="landing-button btn-login">Login</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
