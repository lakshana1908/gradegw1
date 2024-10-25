import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // Adjust the path if needed
 // Placeholder for Staff login page
import './App.css';
import StaffComponent from './components/StaffComponent.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/staff" element={<StaffComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
