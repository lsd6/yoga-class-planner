import React, { useState } from 'react';
import './Register.css';
import TeacherRegistrationForm from './TeacherRegistrationForm';

const Register = () => {
  const [showTeacherForm, setShowTeacherForm] = useState(false);

  const toggleTeacherForm = () => {
    setShowTeacherForm(!showTeacherForm);
  };

  return (
    <div className="register-container">
      <div className={`card ${showTeacherForm ? 'expanded' : ''}`}>
        <h4>Please choose a role that best describes you</h4>
        <div className="button-container">
          <button className="role-button" onClick={toggleTeacherForm}>Instructor</button>
          <button className="role-button" onClick={toggleTeacherForm}>Student</button>
        </div>
        {showTeacherForm && <TeacherRegistrationForm />}
      </div>
    </div>
  );
};

export default Register;
