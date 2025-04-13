import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Inline CSS for the Navbar component
const Navbar = () => {
    const navigate = useNavigate();
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    console.log(user);

    const handleLogout = () => {
        // Remove user data from local storage
        localStorage.removeItem('user');
        // Redirect to landing page
        navigate('/');
    };

    return (
        <>
            <style>
                {`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: Arial, sans-serif;
                    background: #f4f4f4;
                    min-height: 100vh;
                    color:  rgb(0,0,0);
                }

                .navbar {
                    background: linear-gradient(45deg, #4c6ef5, #ff6f61);
                    padding: 1rem 2rem;
                    border-bottom: 2px solid #ddd;
                    transition: background-color 0.3s ease;
                }

                .navbar-brand {
                    font-size: 28px;
                    font-weight: bold;
                    color: #fff;
                    text-decoration: none;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    transition: color 0.3s ease;
                    background: linear-gradient(45deg, #4c6ef5, #ff6f61);
                    -webkit-background-clip: text;
                    background-clip: text;
                    animation: headingAppear 1s ease-out forwards;
                }

                .navbar-brand:hover {
                    color: #3b5fdd;
                    transform: scale(1.1);
                    transition: transform 0.3s ease;
                }

                .navbar-nav .nav-link {
                    color: #fff;
                    font-size: 16px;
                    font-weight: 600;
                    margin-left: 20px;
                    text-transform: uppercase;
                    transition: color 0.3s ease, transform 0.2s ease;
                }

                .navbar-nav .nav-link:hover {
                    color: #4c6ef5;
                    transform: scale(1.1);
                }

                .btn-link {
                    color: #fff;
                    font-weight: 600;
                    border: none;
                    background: none;
                    text-transform: uppercase;
                    transition: color 0.3s ease, transform 0.2s ease;
                    cursor: pointer;
                }

                .btn-link:hover {
                    color: #4c6ef5;
                    transform: scale(1.1);
                }

                .navbar-toggler {
                    border: none;
                    background: #4c6ef5;
                }

                .navbar-toggler-icon {
                    background-color: white;
                }

                .navbar-collapse {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }

                .navbar-nav {
                    display: flex;
                    align-items: center;
                    list-style: none;
                }

                @keyframes headingAppear {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>

            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/dashboard">CollabTool</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                        </ul>
                        {user ? (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>{user.username}  Logout</button>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
