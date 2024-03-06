import React, { useState } from 'react';
import "./HeaderBar.css";
import { FaBars } from 'react-icons/fa'; // Import the hamburger menu icon

const HeaderBar = () => {
    const [showNavLinks, setShowNavLinks] = useState(false);

    const toggleNavLinks = () => {
        setShowNavLinks(!showNavLinks);
    };

    return (
        <div className="header-bar">
            <div className="logo">
                {/* Add your company logo */}
                <img src="/Assets/Images/company-logo.png" alt="Company Logo" />
            </div>
            <div className="company-name">
                {/* Add your company name */}
                <h1>Zenflow</h1>
            </div>
            <div className="nav-links">
                {/* Navigation links */}
                <ul className={showNavLinks ? "show" : ""}>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Classes</a></li>
                    <li><a href="#">Pricing</a></li>
                </ul>
            </div>
            <div className="login-btn">
                {/* Use Link component to navigate to login page */}
               
                    <button>Login/Signup</button>
                
            </div>
            <div className="hamburger-menu" onClick={toggleNavLinks}>
                {/* Hamburger menu icon */}
                <FaBars />
            </div>
        </div>
    );
};

export default HeaderBar;
