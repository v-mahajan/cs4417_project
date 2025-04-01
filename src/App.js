import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import FeedbackPage from './pages/FeedbackPage.jsx';
import ChangePassword from './pages/ChangePasswordPage.jsx';

function App() {

  console.log("LoginPage Component:", LoginPage); //Add this line.

  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/home" element={<HomePage />}/>
      <Route path="/changePassword" element={<ChangePassword />}/>
      </Routes>
    </Router>
  );
}

export default App;
