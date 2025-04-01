import React from 'react';
import computerIcon from '../icons/computerIcon.png';
import cybersecIcon from '../icons/cybersecIcon.png';
import dropdownIcon from '../icons/dropdownIcon.png';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function HomePage() {

    const navigate = useNavigate();
    
    const handleSignOut = () => {
        // 1. Clear token or session data
        localStorage.removeItem('token');
    
        // 2. Redirect to login page
        navigate('/login');
      };

    const linkStyle = {
        textDecoration: 'none',
        color: 'black',
        padding: '8px 12px',
        fontWeight: '500',
        borderRadius: '5px',
    };
    
    const activeStyle = {
        textDecoration: 'underline',
        backgroundColor: '#f0f0f0',
    };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* Navbar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 30px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #ccc',
      }}>
        {/* Left logo and title */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={computerIcon}
            alt="logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          <h2 style={{ margin: 0 }}>CS 4417</h2>
        </div>

        {/* Center navigation */}
        <nav style={{ display: 'flex', gap: '25px' }}>
        <NavLink
          to="/vision"
          className="nav-link"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          Our Vision
        </NavLink>

        <NavLink
          to="/contact"
          className="nav-link"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          Contact Us
        </NavLink>

        <NavLink
          to="/feedback"
          className="nav-link"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          Feedback
        </NavLink>
      </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', gap: '20px' }}>
        <NavLink
          to="/login"
          className="nav-link"
          onClick={handleSignOut}
          style={({ isActive }) => {
            return isActive
              ? {
                  textDecoration: 'underline',
                  color: 'black',
                  padding: '8px 12px',
                  fontWeight: '500',
                  borderRadius: '5px',
                  backgroundColor: '#f0f0f0',
                }
              : {
                  textDecoration: 'none',
                  color: 'black',
                  padding: '8px 12px',
                  fontWeight: '500',
                  borderRadius: '5px',
                };
          }}
          
        >
          Sign Out
        </NavLink>

        <span>/</span>

        <NavLink
          to="/changePassword"
          className="nav-link"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          Change Password
        </NavLink>
      </div>
      </header>

      {/* Hero section */}
      <main style={{
        backgroundColor: '#d36d60',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '80px 60px',
        minHeight: '80vh',
      }}>
        {/* Left text content */}
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Building My Application <br /> From Scratch
          </h1>
          <p style={{ fontSize: '1.2rem' }}>Trust me it’s a lotta fun</p>
        </div>

        {/* Right image (gear with lock) */}
        <div>
          <img
            src={cybersecIcon}
            alt="security gear icon"
            style={{ height: '220px' }}
          />
        </div>
      </main>
    </div>
  );
}
