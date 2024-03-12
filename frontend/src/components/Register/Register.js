import React, { useState } from "react";
import "./Register.css";
import TeacherRegistrationForm from "../TeacherRegistrationForm/TeacherRegistrationForm";
import StudentRegistration from "../StudentRegistration/StudentRegistration";

const Register = () => {
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);

  const toggleTeacherForm = () => {
    setShowTeacherForm(!showTeacherForm);
    setShowStudentForm(false);
  };

  const toggleStudentForm = () => {
    setShowStudentForm(!showStudentForm);
    setShowTeacherForm(false);
  };

  return (
    <div className="register-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url('/Assets/Images/yogabackground.jpg')` }}
      />
      <div
        className={`card ${showTeacherForm ? "expanded-teacher" : ""} ${
          showStudentForm ? "expanded-student" : ""
        }`}
      >
        <h4>Please choose a role that best describes you</h4>
        <div className="button-container">
          <button className="role-button" onClick={toggleTeacherForm}>
            Instructor
          </button>
          <button className="role-button" onClick={toggleStudentForm}>
            Student
          </button>
        </div>
        {showTeacherForm && <TeacherRegistrationForm />}
        {showStudentForm && <StudentRegistration />}
      </div>
    </div>
  );
};

export default Register;
