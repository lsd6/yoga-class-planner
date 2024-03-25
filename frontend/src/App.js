import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import TeacherHeaderBar from "./components/dashboard-components/TeacherDashboard/TeacherHeaderBar/TeacherHeaderBar";
import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentHeaderBar from "./components/dashboard-components/StudentDashboard/StudentHeaderBar/StudentHeaderBar";
import AboutMe from "./components/AboutMe/AboutMe";

function App() {
  const [userType, setUserType] = useState(""); // Initialize userType state

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <HeaderBar />
              <Home /> <AboutMe />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
        {/* Removed userType prop */}
        <Route
          path="/reset-password/:token"
          element={
            <PasswordReset userType={userType} setUserType={setUserType} />
          }
        />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route
          path="/teacher-dashboard"
          element={
            <div>
              <TeacherHeaderBar />
              <TeacherDashboard />
            </div>
          }
        />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route
          path="/student-dashboard"
          element={
            <div>
              <StudentHeaderBar />
              <StudentDashboard />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
