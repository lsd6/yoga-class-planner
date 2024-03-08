import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import HeaderBar from './components/HeaderBar';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Define route for Register component */}

      </Routes>
    </Router>
  );
}

export default App;
