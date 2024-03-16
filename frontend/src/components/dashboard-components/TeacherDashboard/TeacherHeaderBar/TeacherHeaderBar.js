import React, { useState } from 'react';
import logo from '../../../../Images/company-logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../TeacherHeaderBar/TeacherHeaderBar.css';

const TeacherHeaderBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    // Handle profile button click
  };

  const handleLogoutClick = () => {
    // Handle logout button click
    console.log('Logout clicked');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="teacher-header-bar">
      <img src={logo} alt="Company Logo" className="logo" />
      <div className="account-icon" onClick={handleClick}>
        <AccountCircleIcon />
      </div>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default TeacherHeaderBar;
