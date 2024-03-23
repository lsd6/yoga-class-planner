import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import Lottie from 'lottie-react';
import yogaAnimation from "../../Images/yoga2.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter email and password");
      return;
    }
    try {
      let loginEndpoint = "";
      if (userType === "student") {
        loginEndpoint = "http://localhost:5001/api/students/login";
      } else if (userType === "teacher") {
        loginEndpoint = "http://localhost:5001/api/teachers/login";
      } else if (userType === "admin") {
        loginEndpoint = "http://localhost:5001/api/admins/login";
      }

      const response = await axios.post(loginEndpoint, {
        email,
        password,
      });

      if (response.status === 200) {
        if (userType === "student") {
          navigate("/student-dashboard");
        } else if (userType === "teacher") {
          navigate("/teacher-dashboard");
        } else if (userType === "admin") {
          navigate("/admin-dashboard");
        }
      } else {
        setErrorMessage("Please check email address or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Please check email address or password");
    }
  };

  return (
    <div className="login-page">
    <div className="lottie-animation-container">
        <Lottie className="lottie-animation" animationData={yogaAnimation} />
      </div>
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Show/hide password icon */}
          <div
            className="password-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <label htmlFor="userType">User Type:</label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        
      </div>
    </div>
    </div>
  );
};

export default Login;
