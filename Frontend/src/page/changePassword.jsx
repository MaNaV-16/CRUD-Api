import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; 

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); 
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setMessage("Sending OTP...");
        try {
            const response = await fetch('http://localhost:5000/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            
            if (response.ok) {
                setMessage("OTP sent to your email!");
                setStep(2);
            } else {
                setMessage(data.message || "Error sending OTP.");
            }
        } catch (error) {
            setMessage("Server error!");
        }
    };
    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword })
            });
            const data = await response.json();
            
            if (response.ok) {
                setMessage("Password changed successfully! Redirecting...");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMessage(data.message || "Failed to change password.");
            }
        } catch (error) {
            setMessage("Server error!");
        }
    };

    return (
        <div className="login-container">
            <h2>Change Password</h2>
            
            {step === 1 ? (
                <form onSubmit={handleSendOtp}>
                    <input 
                        type="email" 
                        placeholder="Enter your Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <button type="submit">Send OTP</button>
                </form>
            ) : (
                <form onSubmit={handleChangePassword}>
                    <input 
                        type="text" 
                        placeholder="Enter OTP" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Enter New Password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit">Update Password</button>
                </form>
            )}

            <h4 style={{ color: step === 2 ? 'green' : '#d9534f' }}>{message}</h4>
            
            <p style={{ marginTop: '15px' }}>
                Back to <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Login</Link>
            </p>
        </div>
    );
};

export default ChangePassword;