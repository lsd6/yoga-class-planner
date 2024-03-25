import React, { useState } from "react";
import axios from "axios";
import "../TeacherRegistrationForm/TeacherRegistrationForm.css";

const StudentRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/students/register",
        {
          name,
          email,
          password,
        }
      );
      setSuccessMessage("Registration successful! Welcome aboard!");
      console.log(response.data);
    } catch (error) {
      console.error("Error registering teacher:", error.message);
      if (error.response && error.response.status === 400) {
        setErrorMessage("This email address is already registered. Please use a different email.");
      } else {
        setErrorMessage("Error registering teacher. Please try again.");
      }
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
      <h2>Student Registration</h2>
      {successMessage && (
        <div className="success">
          <p>{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="error">
          <p>{errorMessage}</p>
        </div>
      )}
      <form className="form" onSubmit={handleRegistration}>
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
        <button className="submit-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentRegistration;
