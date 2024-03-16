const express = require('express');
const app = express();
const PORT = 5000;

// Sample class data
const classes = [
  {
    id: 1,
    image: 'https://example.com/image.jpg',
    teacherName: 'John Doe',
    yogaPose: 'Downward-Facing Dog',
    musclesInvolved: ['Back', 'Legs', 'Shoulders'],
    yogaUses: ['Strength', 'Flexibility', 'Stress Relief'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    duration: '1 hour',
    location: 'Studio A',
    time: '10:00 AM',
    category: 'Beginner'
  },
  // Add more sample class objects as needed
];

// API endpoint to fetch available classes
app.get('/api/classes', (req, res) => {
  // Simulate delay to mimic real API response time (optional)
  setTimeout(() => {
    res.json(classes);
  }, 1000); // 1 second delay
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
