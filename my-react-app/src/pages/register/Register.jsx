import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios correctly
import './register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async (ev) => {
        ev.preventDefault();
        try {
            // POST request to your backend register endpoint
            await axios.post('http://localhost:8000/api/auth/register', { 
                username, // Use `username` as required by the backend
                email, 
                password 
            });
            alert('Registration successful, you can now login!');
        } catch (e) {
            console.error('Registration failed:', e.response?.data || e.message);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="title">Register</h2>
                <form onSubmit={registerUser} className="login-form">
                    <input 
                        type="text" 
                        placeholder="Ex: Hadi_Baydoun (username)" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="lInput"
                    />
                    <input 
                        type="email" 
                        placeholder="your-email@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="lInput"
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="lInput"
                    />
                    <button type="submit" className="lButton">Register</button>
                </form>
                <div className="text-center">
                    Already have an account? 
                    <Link to="/login" className="login-link">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
