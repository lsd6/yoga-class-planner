// src/components/Auth/StudentRegister.js

import React, { useState } from 'react';
import axios from 'axios';

const StudentRegister = () => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State variable to store registration status message
  const [message, setMessage] = useState('');

  // Functioaan to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration request to backend
      const response = await axios.post('http://localhost:5001/api/students/register', {
        name,
        email,
        password
      });
      // If registration successful, display success message
      setMessage(response.data.message);
    } catch (error) {
      // If registration fails, display error message
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Student Registration</h2>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
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

export default StudentRegister;
