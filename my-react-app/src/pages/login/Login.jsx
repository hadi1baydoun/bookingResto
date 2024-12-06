import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import './login.css';

const BACKEND_API = "http://localhost:8000"; // Replace with your backend server's base URL

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [redirect, setRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message
    const [loading, setLoading] = useState(false); // Loading state for async operations

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error messages
        setLoading(true);
        try {
            const { data } = await axios.post(`${BACKEND_API}/api/auth/login`, credentials);
            localStorage.setItem('user', JSON.stringify(data)); // Save user data in localStorage
            alert('Login successful...');
            setRedirect(true); // Redirect after login
        } catch (error) {
            // Check for invalid email/password or other errors
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid email or password. Please try again.');
            } else {
                setErrorMessage('Something went wrong. Please try again later.');
            }
            console.error("Login failed:", error.response?.data || error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    if (redirect) {
        return <Navigate to="/" />; // Redirect to the home page after successful login
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        value={credentials.email}
                        onChange={handleChange}
                        className="lInput"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className="lInput"
                    />
                    <button type="submit" className="lButton" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <p className="register-prompt">
                    Don't have an account? <a href="/register">Register now</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
