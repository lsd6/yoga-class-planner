import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './HeaderBar.css';
import { FaBars } from 'react-icons/fa';

const HeaderBar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [showHeaderBar, setShowHeaderBar] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setShowHeaderBar(false); 
  };

  useEffect(() => {
    const shouldShowHeaderBar = location.pathname !== '/login'; 
    setShowHeaderBar(shouldShowHeaderBar);
  }, [location]);

  return (
    <div className={`header-bar ${showHeaderBar ? 'show' : 'hide'}`}>
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
