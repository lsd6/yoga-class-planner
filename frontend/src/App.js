import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import HeaderBar from './components/HeaderBar/HeaderBar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import PasswordReset from './components/PasswordReset/PasswordReset';
import AdminDashboard from './pages/Admin/AdminDashboard';
import TeacherDashboard from './pages/Teacher/TeacherDashboard'; // Import TeacherDashboard component
import TeacherHeaderBar from './components/dashboard-components/TeacherDashboard/TeacherHeaderBar/TeacherHeaderBar'; // Import TeacherHeaderBar component

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
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        {/* Render TeacherHeaderBar inside the TeacherDashboard */}
        <Route
          path="/teacher-dashboard"
          element={
            <div>
              <TeacherHeaderBar />
              <TeacherDashboard />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
