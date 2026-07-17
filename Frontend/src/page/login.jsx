import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }) 
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/");
                setMessage("Login successful!");
            } else {
                setMessage(data.message || "Login failed.");
            }
        } catch (error) {
            setMessage("An error occurred while logging in.");
        }
    }

    return (
        <div className="login-container">
            <h2> User Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <div style={{textAlign: 'right', margin: '10px'}}>
                <Link to="/change-password" style={{ textDecoration: 'none', color: '#007bff' }}>
                    Forgot Password?
                </Link>
            </div>
            <h4>{message}</h4>
            
        </div>
    );
}

export default Login;