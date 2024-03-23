import React from 'react';
import Modal from 'react-modal';
import './ClassDetailsModal.css';

const ClassDetailsModal = ({ isOpen, closeModal, classDetails }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Class Details"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>Class Details</h2>
        <table>
          <tbody>
            <tr>
              <th>Class Name:</th>
              <td>{classDetails.className}</td>
            </tr>
            <tr>
              <th>Description:</th>
              <td>{classDetails.description}</td>
            </tr>
            <tr>
              <th>Category:</th>
              <td>{classDetails.category}</td>
            </tr>
            <tr>
              <th>Booking Date & Time:</th>
              <td>{new Date(classDetails.bookingDateTime).toLocaleString()}</td>
            </tr>
            <tr>
              <th>Booked Students:</th>
              <td>
                <ul>
                  {classDetails.bookedStudents.map(student => (
                    <li key={student._id}>
                      <div><strong>Name:</strong> {student.name}</div>
                      <div><strong>Email:</strong> {student.email}</div>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
};

export default ClassDetailsModal;
