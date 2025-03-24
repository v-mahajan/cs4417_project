import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import FeedbackPage from './pages/FeedbackPage.jsx';

function App() {

  console.log("LoginPage Component:", LoginPage); //Add this line.

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
