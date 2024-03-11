import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";
import Lottie from "lottie-react";
import forgotAnimation from "../Images/forgot.json";
import resetemail from "../Images/resetemail.json";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailsent, SetEmailsent] = useState(false);

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        throw new Error("Please enter your email.");
      }

      const response = await axios.post(
        "http://localhost:5001/api/admins/forgot-password",
        { email }
      );

      SetEmailsent(true);
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
      <div className={emailsent ? "dis" : "animation-container"}>
        <Lottie animationData={forgotAnimation} />
      </div>
      <div className={emailsent ? "animation-container" : "dis"}>
        <Lottie animationData={resetemail} />
      </div>
      <div className="content-container">
        <h2>Forgot Password</h2>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
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
