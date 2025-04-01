import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const sanitizeHtml = require('sanitize-html');

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    console.log("my name is vansh1");
    e.preventDefault();
    setMessage("");

    try {
      console.log("my name is vansh2");
      try {
        username = sanitizeHtml(username);
        password = sanitizeHtml(password);
         // If this still doesn’t print, something in sanitizeHtml might be throwing an error
      } catch (err) {
        console.error("Sanitization failed:", err);
      }      
      console.log("running the api next");
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("The data is ", data);
      if (response.ok) {
        localStorage.setItem("token", data.token); // Store token
        navigate("/home"); // Redirect after successful login
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      setMessage("Failed to connect to the server.");
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>

      {/*********************************  Left Login Panel ************************/}

      <div style={{ flex: 1, backgroundColor: '#fff', padding: '80px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Login To Your Account</h1>
        <form onSubmit={handleLogin}> 
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '20px',
            marginTop: '40px',
            borderRadius: '40px',
            border: 'none',
            backgroundColor: '#fce8e5',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#777',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
          }}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '20px',
            marginTop: '20px',
            borderRadius: '40px',
            border: 'none',
            backgroundColor: '#fce8e5',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#777',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
          }}
        />

        <button
          onSubmit={handleLogin}
          style={{
            marginTop: '30px',
            padding: '15px 0',
            width: '60%',
            borderRadius: '40px',
            border: 'none',
            backgroundColor: '#d36d60',
            color: '#000',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>
        </form>
        {message && (
        <p style={{ color: 'red', marginTop: '15px', fontWeight: 'bold' }}>
          {message}
        </p>
        )}
      </div>

      {/* Right Sign Up Panel */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#d36d60',
          color: '#000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '50px',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
          New Here?
        </h1>
        <p style={{ fontSize: '1.3rem', marginBottom: '40px' }}>
          Sign up to explore our <br /> mysterious site!
        </p>
        <button
          type="submit"
          onClick={() => navigate("/register")}
          style={{
            padding: '15px 40px',
            borderRadius: '40px',
            border: 'none',
            backgroundColor: '#fff',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
