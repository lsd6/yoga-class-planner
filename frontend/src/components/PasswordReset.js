import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import "./PasswordReset.css";
import reset from "../Images/reset.json";
import resetsuccess from "../Images/resetsuccess.json";

const PasswordReset = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [background,SetBackground] = useState(false);

  const handlePasswordReset = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      await axios.post('http://localhost:5001/api/admins/reset-password', { token, newPassword: password });
      SetBackground(true);
      setSuccess('Password reset successfully');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="password-reset-container">
    <div className={background ? 'dis' : 'ani-container'}>
    <Lottie animationData={reset} />
  </div>
  <div className={background ? 'ani-container' : 'dis'}>
    <Lottie animationData={resetsuccess} />
  </div>  
      <div className="form-container">
        <h2>Password Reset</h2>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={handlePasswordReset} className="submit-button">
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default PasswordReset;
