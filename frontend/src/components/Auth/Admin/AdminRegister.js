// src/components/Auth/AdminRegister.js

import React, { useState } from 'react';
import axios from 'axios';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/admins/register', {
        email,
        password
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Admin Registration</h2>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
