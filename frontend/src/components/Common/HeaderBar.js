// // src/components/Common/HeaderBar.js

// import React from 'react';
// import './HeaderBar.css'; // Import the CSS file

// const HeaderBar = () => {
//   return (
//     <div className="header-bar">
//       <div className="left">
//         <span className="logo">Zenflow</span>
//       </div>
//       <div className="center">
//         <nav className="nav-links">
//           <ul>
//             <li><a href="#">Home</a></li>
//             <li><a href="#">About Us</a></li>
//             <li><a href="#">Classes</a></li>
//           </ul>
//         </nav>
//       </div>
//       <div className="right">
//         <button className="login-signup-btn">Login/SignUp</button>
//       </div>
//     </div>
//   );
// };

// export default HeaderBar;
// src/components/HeaderBar.js

import React, { useState } from 'react';
import './HeaderBar.css'; // Import the CSS file
import { FaBars } from 'react-icons/fa'; // Import the hamburger menu icon

const HeaderBar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <div className="header-bar">
      <div className="left">
        <span className="logo">Zenflow</span>
      </div>
      <div className="center">
        <nav className={showNavLinks ? "nav-links show" : "nav-links"}>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Classes</a></li>
          </ul>
        </nav>
      </div>
      <div className="right">
        <div className="login-signup-btn">Login/SignUp</div>
        <div className="hamburger-menu" onClick={toggleNavLinks}>
          <FaBars />
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
