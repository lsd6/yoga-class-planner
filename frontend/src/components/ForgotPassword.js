import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/admins/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="email-input"
      />
      <button onClick={handleForgotPassword} className="reset-password-button">Reset Password</button>
    </div>
  );
};

export default ForgotPassword;
