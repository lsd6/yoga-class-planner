import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PasswordReset = () => {
  const { token } = useParams(); // Extract the token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordReset = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      await axios.post('http://localhost:5001/api/admins/reset-password', { token, newPassword: password });
      setSuccess('Password reset successfully');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
    </div>
  );
};

export default PasswordReset;
