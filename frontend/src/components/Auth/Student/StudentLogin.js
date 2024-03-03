// src/components/Auth/StudentLogin.js

import React, { useState } from 'react';
import axios from 'axios';

const StudentLogin = () => {
  // State variables to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State variable to store login error message
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5001/api/students/login', {
        email,
        password
      });
      // If login successful, redirect or perform desired action
      console.log(response.data); // Log success message or user data
    } catch (error) {
      // If login fails, display error message
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Student Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default StudentLogin;
