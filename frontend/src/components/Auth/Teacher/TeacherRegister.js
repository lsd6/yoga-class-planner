// src/components/Auth/TeacherRegister.js

import React, { useState } from 'react';
import axios from 'axios';

const TeacherRegister = () => {
  // State variables to store form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration request to backend
      const response = await axios.post('http://localhost:5001/api/teachers/register', {
        email,
        password,
        personalDetails: {
          country,
          name,
          address,
          city,
          state,
          postalCode
        }
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
      <h2>Teacher Registration</h2>
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
        <div>
          <label>Country:</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>City:</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div>
          <label>State:</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />
        </div>
        <div>
          <label>Postal Code:</label>
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default TeacherRegister;
