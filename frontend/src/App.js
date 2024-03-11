import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import HeaderBar from './components/HeaderBar';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword'; // Import the ForgotPassword component
import PasswordReset from './components/PasswordReset'; // Import the PasswordReset component

function App() {
  return (
    <Router>
      <Routes>
      <Route
      path="/"
      element={
        <div>
          <HeaderBar />
          <Home />
        </div>
      }
    />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<PasswordReset />} />
      </Routes>
    </Router>
  );
}

export default App;
