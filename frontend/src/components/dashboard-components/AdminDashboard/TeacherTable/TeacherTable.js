import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../../Loader/Loader'; // Import the Loader component
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/admins/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader>{/* Display the Loader component while loading */}</Loader>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Postal Code</TableCell>
                <TableCell>Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher._id}>
                  <TableCell>{teacher.personalDetails.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.personalDetails.country}</TableCell>
                  <TableCell>{teacher.personalDetails.address}</TableCell>
                  <TableCell>{teacher.personalDetails.city}</TableCell>
                  <TableCell>{teacher.personalDetails.state}</TableCell>
                  <TableCell>{teacher.personalDetails.postalCode}</TableCell>
                  <TableCell>{teacher.personalDetails.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TeacherTable;
