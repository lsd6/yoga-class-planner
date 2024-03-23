import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Modal from 'react-modal';

// Set the application element for react-modal
Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
