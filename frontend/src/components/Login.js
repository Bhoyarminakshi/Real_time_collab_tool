import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Inline CSS for the Login component
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to handle error message
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            navigate('/dashboard'); // Redirect to dashboard if login is successful
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); // Set error message if login fails
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
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
                    background: linear-gradient(45deg, #4c6ef5, #5a3f37);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                }

                .login-container {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(45deg, #4c6ef5, #5a3f37);
                    padding: 2rem;
                }

                .form-card {
                    background-color: white;
                    padding: 2rem;
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    max-width: 400px;
                    width: 100%;
                    text-align: center;
                    transform: translateY(30px);
                    opacity: 0;
                    animation: formAppear 0.6s ease-out forwards;
                    transition: transform 0.3s ease-in-out;
                }

                .form-card:hover {
                    transform: scale(1.05);
                }

                @keyframes formAppear {
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                /* Updated Heading Style */
                .form-heading {
                    font-size: 36px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    color:  #4c6ef5;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    background: linear-gradient(45deg, #4c6ef5, #ff6f61);
                    -webkit-background-clip: text;
                    background-clip: text;
                    animation: headingAppear 1s ease-out forwards;
                    transition: color 0.3s ease, font-weight 0.3s ease;
                    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
                    text-align: center;
                }

                /* Bold effect on hover */
                .form-heading:hover {
                    font-weight: 900;
                    color: #3b5fdd; /* Make the font bolder on hover */
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

                .form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    align-items: flex-start;
                }

                label {
                    font-size: 14px;
                    font-weight: 600;
                    color: #333;
                }

                .form-input {
                    padding: 12px;
                    width: 100%;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-size: 16px;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .form-input:focus {
                    border-color: #4c6ef5;
                    box-shadow: 0 0 8px rgba(76, 110, 245, 0.7);
                }

                .form-input::placeholder {
                    color: #bbb;
                    transition: opacity 0.3s ease-in-out;
                }

                .form-input:focus::placeholder {
                    opacity: 0;
                }

                .submit-btn {
                    padding: 12px;
                    background-color: #4c6ef5;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }

                .submit-btn:hover {
                    background-color: #3b5fdd;
                    transform: scale(1.05);
                }

                .error-message {
                    color: #e53e3e;
                    font-size: 14px;
                    margin-top: 10px;
                    opacity: 0;
                    animation: errorFadeIn 0.5s ease forwards;
                }

                @keyframes errorFadeIn {
                    to {
                        opacity: 1;
                    }
                }

                .register-link {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #666;
                    transition: color 0.3s ease;
                }

                .register-link-text {
                    color: #4c6ef5;
                    text-decoration: none;
                    font-weight: 600;
                }

                .register-link-text:hover {
                    text-decoration: underline;
                    color: #3b5fdd;
                }
                `}
            </style>

            <div className="login-container">
                <div className="form-card">
                    <h2 className="form-heading">Login to Your Account</h2>
                    <form onSubmit={handleLogin} className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            Login
                        </button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    <p className="register-link">
                        Don't have an account?{' '}
                        <a href="/register" className="register-link-text">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
