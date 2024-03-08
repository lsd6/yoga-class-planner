// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
// import "./HeaderBar.css";
// import { FaBars } from 'react-icons/fa'; // Import the hamburger menu icon

// const HeaderBar = () => {
//   const [showNavLinks, setShowNavLinks] = useState(false);
//   const navigate = useNavigate();

//   const toggleNavLinks = () => {
//     setShowNavLinks(!showNavLinks);
//   };

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   return (
//     <div className="header-bar">
//       <div className="logo">
//         {/* Add your company logo */}
//         <img src="/Assets/Images/company-logo.png" alt="Company Logo" />
//       </div>
//       <div className="company-name">
//         {/* Add your company name */}
//         <h1>Zenflow</h1>
//       </div>
//       <div className="nav-links">
//         {/* Navigation links */}
//         <ul className={showNavLinks ? "show" : ""}>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About Us</Link></li>
//         <li><Link to="/classes">Classes</Link></li>
//         <li><Link to="/pricing">Pricing</Link></li>
//         </ul>
//       </div>
//       <div className="login-btn" onClick={handleLoginClick}>
//         <button>Login/Signup</button>
//       </div>
//       <div className="hamburger-menu" onClick={toggleNavLinks}>
//         {/* Hamburger menu icon */}
//         <FaBars />
//       </div>
//     </div>
//   );
// };

// export default HeaderBar;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './HeaderBar.css';
// import { FaBars } from 'react-icons/fa';

// const HeaderBar = () => {
//   const [showNavLinks, setShowNavLinks] = useState(false);
//   const [showHeaderBar, setShowHeaderBar] = useState(true); // Initially show HeaderBar
//   const navigate = useNavigate();

//   const toggleNavLinks = () => {
//     setShowNavLinks(!showNavLinks);
//   };

//   const handleLoginClick = () => {
//     navigate('/login');
//     setShowHeaderBar(false); // Hide HeaderBar when Login/Signup button is clicked
//   };

//   return (
//     <div className={`header-bar ${showHeaderBar ? 'show' : 'hide'}`}>
//       <div className="logo">
//         <img src="/Assets/Images/company-logo.png" alt="Company Logo" />
//       </div>
//       <div className="company-name">
//         <h1>Zenflow</h1>
//       </div>
//       <div className="nav-links">
//         <ul className={showNavLinks ? 'show' : ''}>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about">About Us</Link></li>
//           <li><Link to="/classes">Classes</Link></li>
//           <li><Link to="/pricing">Pricing</Link></li>
//         </ul>
//       </div>
//       <div className="login-btn" onClick={handleLoginClick}>
//         <button>Login/Signup</button>
//       </div>
//       <div className="hamburger-menu" onClick={toggleNavLinks}>
//         <FaBars />
//       </div>
//     </div>
//   );
// };

// export default HeaderBar;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './HeaderBar.css';
import { FaBars } from 'react-icons/fa';

const HeaderBar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [showHeaderBar, setShowHeaderBar] = useState(true); // Initially show HeaderBar
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setShowHeaderBar(false); // Hide HeaderBar when Login/Signup button is clicked
  };

  useEffect(() => {
    const shouldShowHeaderBar = location.pathname !== '/login'; // Check if the current path is not the login page
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
