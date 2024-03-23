// StudentDashboard.js

import React from 'react';
import StudentHeaderBar from '../../components/dashboard-components/StudentDashboard/StudentHeaderBar/StudentHeaderBar'; // Import the StudentHeaderBar component
import StudentBookingForm from '../Student/StudentBookingForm'; // Import the StudentBookingForm component

const StudentDashboard = () => {
  return (
    <div>
      <StudentHeaderBar />
      <h1>Welcome to Student Dashboard</h1>
      <StudentBookingForm />
    </div>
  );
};

export default StudentDashboard;
