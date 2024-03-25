import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import "./PasswordReset.css";
import reset from "../../Images/reset.json";
import resetsuccess from "../../Images/resetsuccess.json";

const PasswordReset = ({ userType, setUserType }) => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [background, setBackground] = useState(false);
  const [redirecting, setRedirecting] = useState(false); // State to track redirecting
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      let endpoint;
      if (userType === 'admin') {
        endpoint = 'http://localhost:5001/api/admins/reset-password';
      } else if (userType === 'teacher') {
        endpoint = 'http://localhost:5001/api/teachers/reset-password';
      } else if (userType === 'student') {
        endpoint = 'http://localhost:5001/api/students/reset-password';
      } else {
        throw new Error('Invalid user type');
      }

      await axios.post(endpoint, { token, newPassword: password });
      setBackground(true);
      setSuccess('Password reset successfully');
      setRedirecting(true);
      setTimeout(() => {
        navigate('/login');
      }, 5000); // Redirect after 5 seconds
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else if (error.message === 'Network Error') {
        setError('Network error occurred. Please check your internet connection.');
      } else {
        setError('An error occurred while resetting the password');
      }
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
        {/* User Type Dropdown */}
        <div className="input-group">
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
        {redirecting && <p className="redirect-message">Redirecting to login page...</p>}
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
