const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Update the connection string with the one from MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://sowjanya:Sowjanya34@cluster0.9utgvzp.mongodb.net/';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

app.use('/api/admins', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Yoga Class Planner API');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
