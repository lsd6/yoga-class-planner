// src/App.js

import React from 'react';
import Home from './components/Home'; // Import the Home component
import HeaderBar from './components/HeaderBar'; // Import the HeaderBar component

function App() {
  return (
    <div className="App">
      <HeaderBar />
      <Home /> {/* Render the Home component */}
    </div>
  );
}

export default App;
