import React, { useState } from 'react';
import axios from 'axios';
import './TeacherRegistrationForm.css'; // Import the CSS file for styling

const TeacherRegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState(true); // Default value
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate input fields
      if (!email || !password || !country || !name) {
        throw new Error('Please fill in all required fields.');
      }

      // Send a POST request to the backend endpoint for teacher registration
      const response = await axios.post('http://localhost:5001/api/teachers/register', {
        email,
        password,
        personalDetails: {
          country,
          name,
          address,
          city,
          state,
          postalCode,
          phoneNumber,
          displayPhoneNumber,
        },
      });

      // Handle success or display appropriate message to the user
      console.log(response.data);
    } catch (error) {
      console.error('Error registering teacher:', error.message);
      setErrorMessage(error.message); // Set error message state
    }
  };

  return (
    <div className="teacher-registration-container">
      <h2>Teacher Registration Form</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if exists */}
      <form onSubmit={handleFormSubmit} className="form">
        {/* Input fields */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code:</label>
          <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default TeacherRegistrationForm;
