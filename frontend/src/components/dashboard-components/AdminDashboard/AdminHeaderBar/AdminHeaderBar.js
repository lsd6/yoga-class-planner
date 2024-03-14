// import React from 'react';
// import logo from '../../../../Images/company-logo.png'; // Import the logo image
// import './AdminHeaderBar.css'; // Import your custom CSS file

// const AdminHeaderBar = ({ handleMenuClick, handleStudentClick }) => {
//   return (
//     <div className="admin-header-bar">
//       <img src={logo} alt="Company Logo" className="logo" />
//       <div className="buttons">
//         <button onClick={handleStudentClick} className="menu-button">
//           Student Details
//         </button>
//         <button onClick={() => handleMenuClick('teacherList')} className="menu-button">
//           Teacher List
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminHeaderBar;


import React from 'react';
import logo from '../../../../Images/company-logo.png'; // Import the logo image
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import the AccountCircleIcon from Material-UI
import './AdminHeaderBar.css'; // Import your custom CSS file

const AdminHeaderBar = ({ handleMenuClick, handleStudentClick }) => {
  return (
    <div className="admin-header-bar">
      <img src={logo} alt="Company Logo" className="logo" />
      <div className="menu">
        <button onClick={handleStudentClick} className="menu-button">
          Student Details
        </button>
        <button onClick={() => handleMenuClick('teacherList')} className="menu-button">
          Teacher List
        </button>
      </div>
      <div className="account-icon">
        <AccountCircleIcon />
      </div>
    </div>
  );
};

export default AdminHeaderBar;
