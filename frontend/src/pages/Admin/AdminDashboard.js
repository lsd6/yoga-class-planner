import React, { useState } from 'react';
import AdminHeaderBar from '../../components/dashboard-components/AdminDashboard/AdminHeaderBar/AdminHeaderBar';
import TeacherTable from '../../components/dashboard-components/AdminDashboard/TeacherTable./TeacherTable';
import StudentTable from '../../components/dashboard-components/AdminDashboard/StudentTable/StudentTable'; // Import StudentTable

const AdminDashboard = () => {
  const [showTeacherTable, setShowTeacherTable] = useState(false);
  const [showStudentTable, setShowStudentTable] = useState(false); // Add state for showing student table

  const handleMenuClick = (option) => {
    if (option === 'teacherList') {
      setShowTeacherTable(true);
      setShowStudentTable(false); // Hide student table when showing teacher table
    } else if (option === 'studentList') { // Handle student list option
      setShowTeacherTable(false); // Hide teacher table when showing student table
      setShowStudentTable(true);
    } else {
      setShowTeacherTable(false);
      setShowStudentTable(false);
    }
  };

  return (
    <div>
      <AdminHeaderBar handleMenuClick={handleMenuClick} handleStudentClick={() => handleMenuClick('studentList')} />
      {showTeacherTable && <TeacherTable />}
      {showStudentTable && <StudentTable />} 
    </div>
  );
};

export default AdminDashboard;
