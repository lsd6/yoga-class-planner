
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HeaderBar.css';
import { FaBars } from 'react-icons/fa';

const HeaderBar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false); 
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
      <div className="header-bar">
      <div className="logo">
        <img src="/Assets/Images/company-logo.png" alt="Company Logo" />
      </div>
      <div className="company-name">
        <h1>Zenflow</h1>
      </div>
      <div className="nav-links">
        <ul className={showNavLinks ? 'show' : ''}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/classes">Classes</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
        </ul>
      </div>
      <div className="login-btn" onClick={handleLoginClick}>
        <button>Login/Signup</button>
      </div>
      <div className="hamburger-menu" onClick={toggleNavLinks}>
        <FaBars />
      </div>
    </div>
  );
};

export default HeaderBar;
