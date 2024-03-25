import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";
import Lottie from "lottie-react";
import forgotAnimation from "../../Images/forgot.json";
import resetemail from "../../Images/resetemail.json";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("admin");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        throw new Error("Please enter your email.");
      }

      let endpoint;
      if (userType === "admin") {
        endpoint = "http://localhost:5001/api/admins/forgot-password";
      } else if (userType === "teacher") {
        endpoint = "http://localhost:5001/api/teachers/forgot-password";
      } else if (userType === "student") {
        endpoint = "http://localhost:5001/api/students/forgot-password";
      } else {
        throw new Error("Invalid user type.");
      }

      const response = await axios.post(endpoint, { email });

      setEmailSent(true);
      setMessage(response.data.message);
    } catch (error) {
      setError(error.message || "An error occurred.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleForgotPassword();
    }
  };

  return (
    <div className="forgot-password-container">
      <div className={emailSent ? "dis" : "animation-container"}>
        <Lottie animationData={forgotAnimation} />
      </div>
      <div className={emailSent ? "animation-container" : "dis"}>
        <Lottie animationData={resetemail} />
      </div>
      <div className="content-container">
        <h2>Forgot Password</h2>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleForgotPassword}
          className="reset-password-button"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;