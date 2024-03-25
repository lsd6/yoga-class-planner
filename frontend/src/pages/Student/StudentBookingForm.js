import React, { useState } from 'react';
import axios from 'axios';
import './StudentBookingForm.css';

const StudentBookingForm = () => {
  const [formData, setFormData] = useState({
    className: '',
    description: '',
    category: '',
    bookingDateTime: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/classes', formData);
      setMessage('Class booked successfully!');
      setError(false);
      setTimeout(() => setMessage(''), 5000);
      console.log('Class booked successfully:', response.data);
    } catch (error) {
      setError(true);
      setMessage('Error booking class. Please try again.');
      setTimeout(() => setMessage(''), 5000);
      console.error('Error booking class:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2>Book Your Yoga Journey Now!!!!</h2>
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
        {message && (
          <div className={`message ${error ? 'error' : 'success'}`}>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentBookingForm;
