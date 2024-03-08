// StudentRegistration.js
import React, { useState } from 'react';
import axios from 'axios';

const StudentRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to backend endpoint for student registration
      const response = await axios.post('http://localhost:5001/api/students/register', {
        name,
        email,
        password,
      });
      console.log(response.data);
      // Handle success response
    } catch (error) {
      console.error('Error registering student:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Student Registration</h2>
      <form onSubmit={handleRegistration}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default StudentRegistration;
