import React, { useState } from 'react';
import AdminHeaderBar from '../../components/dashboard-components/AdminDashboard/AdminHeaderBar/AdminHeaderBar';
import TeacherTable from '../../components/dashboard-components/AdminDashboard/TeacherTable/TeacherTable';
import StudentTable from '../../components/dashboard-components/AdminDashboard/StudentTable/StudentTable';

const AdminDashboard = () => {
  const [showTeacherTable, setShowTeacherTable] = useState(false);
  const [showStudentTable, setShowStudentTable] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleMenuClick = (option) => {
    if (option === 'teacherList') {
      setShowTeacherTable(!showTeacherTable);
      setShowStudentTable(false);
    } else if (option === 'studentList') {
      setShowTeacherTable(false);
      setShowStudentTable(!showStudentTable);
    }
  };

  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleClose = () => {
    setSelectedTeacher(null);
  };

  return (
    <div>
      <AdminHeaderBar handleMenuClick={handleMenuClick} handleStudentClick={() => handleMenuClick('studentList')} />
      {showTeacherTable && <TeacherTable onTeacherClick={handleTeacherClick}/>}
      {showStudentTable && <StudentTable />}
      {selectedTeacher && (
        <div className="modal-backdrop fade show" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content" style={{ borderRadius: '10px' }}>
                <div className="modal-header" style={{ textTransform: 'uppercase', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
                  <h5 className="modal-title">Teacher Details</h5>
                  <button type="button" className="close" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 9999 }}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body" style={{ padding: '30px', display: 'flex', alignItems: 'center' }}>
                  <div className="profile-container" style={{ marginRight: '20px' }}>
                    <img src="/Assets/Images/dp.jpg" alt="Profile" className="profile-picture" style={{ width: '200px', height: '200px', borderRadius: '20px', objectFit: 'cover', border: '5px solid #fff' }} />
                  </div>
                  <div className="details-container" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                    <p><strong>Name:</strong> {selectedTeacher.personalDetails.name}</p>
                    <p><strong>Email:</strong> {selectedTeacher.email}</p>
                    <p><strong>Country:</strong> {selectedTeacher.personalDetails.country}</p>
                    <p><strong>Address:</strong> {selectedTeacher.personalDetails.address}</p>
                    <p><strong>City:</strong> {selectedTeacher.personalDetails.city}</p>
                    <p><strong>State:</strong> {selectedTeacher.personalDetails.state}</p>
                    <p><strong>Postal Code:</strong> {selectedTeacher.personalDetails.postalCode}</p>
                    <p><strong>Phone Number:</strong> {selectedTeacher.personalDetails.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
