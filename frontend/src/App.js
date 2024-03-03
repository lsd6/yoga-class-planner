import React from 'react';
import BackgroundImageComponent from './components/BackgroundImageComponent';
import HeaderBar from './components/Common/HeaderBar'; // Import the HeaderBar component

function App() {
  return (
    <div className="App">
      <HeaderBar /> {/* Add the HeaderBar component */}
      <BackgroundImageComponent />
    </div>
  );
}

export default App;
