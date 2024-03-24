import React, { useState, useEffect } from 'react';
import TeacherHeaderBar from '../../components/dashboard-components/TeacherDashboard/TeacherHeaderBar/TeacherHeaderBar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import ClassDetailsModal from '../../components/ClassDetailsModal/ClassDetailsModal';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClassSchedules();
  }, []);

  const fetchClassSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/classes'); // Update with your backend route
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching class schedules:', error);
    }
  };

  const handleEventClick = (event) => {
    const selectedClass = classes.find(c => c._id === event.classId);
    setSelectedClass(selectedClass);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedClass(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <TeacherHeaderBar />
      <Calendar
        localizer={localizer}
        events={classes.map(c => ({
          title: `${c.className} - ${c.category}`,
          classId: c._id,
          start: new Date(c.bookingDateTime),
          end: new Date(c.bookingDateTime), // You can adjust this if needed
          allDay: false // Set to false for displaying time
        }))}
        onSelectEvent={handleEventClick}
      />

      {selectedClass && (
        <ClassDetailsModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          classDetails={selectedClass}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
