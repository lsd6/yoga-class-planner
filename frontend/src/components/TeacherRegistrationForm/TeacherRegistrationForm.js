import React, { useState } from "react";
import axios from "axios";
import "./TeacherRegistrationForm.css";

const TeacherRegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password || !country || !name) {
        throw new Error("Please fill in all required fields.");
      }

      const response = await axios.post(
        "http://localhost:5001/api/teachers/register",
        {
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
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error registering teacher:", error.message);
      setErrorMessage(error.message);
    }
};

const handleFocus = (e) => {
  const formGroup = e.target.parentNode;
  formGroup.classList.add("focused");
};

const handleBlur = (e) => {
  const formGroup = e.target.parentNode;
  if (!e.target.value) {
    formGroup.classList.remove("focused");
  }
};


  return (
    <div className="teacher-registration-container">
      <h2>Instructor Registration Form</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleFormSubmit} className="form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default TeacherRegistrationForm;
