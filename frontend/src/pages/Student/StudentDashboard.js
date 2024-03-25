// StudentDashboard.js
import React, { useState } from 'react';
import StudentHeaderBar from '../../components/dashboard-components/StudentDashboard/StudentHeaderBar/StudentHeaderBar';
import StudentBookingForm from '../Student/StudentBookingForm';

const StudentDashboard = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookClassClick = () => {
    setShowBookingForm(!showBookingForm);
  };

  return (
    <div>
      <StudentHeaderBar showform = {handleBookClassClick}/>
      <h1>Welcome to Student Dashboard</h1>
      {showBookingForm ? (
        <StudentBookingForm />
      ) : null}
    </div>
  );
};

export default StudentDashboard;
