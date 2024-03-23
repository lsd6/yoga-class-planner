import React, { useState } from 'react';
import axios from 'axios';

const StudentBookingForm = () => {
  const [formData, setFormData] = useState({
    className: '',
    description: '',
    category: '',
    bookingDateTime: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/classes', formData);
      console.log('Class booked successfully:', response.data);
      // Optionally, you can redirect the user to another page or show a success message
    } catch (error) {
      console.error('Error booking class:', error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div>
      <h2>Book a Class</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Class Name:
          <input type="text" name="className" value={formData.className} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </label>
        <label>
          Booking Date & Time:
          <input type="datetime-local" name="bookingDateTime" value={formData.bookingDateTime} onChange={handleChange} />
        </label>
        <button type="submit">Book Class</button>
      </form>
    </div>
  );
};

export default StudentBookingForm;
