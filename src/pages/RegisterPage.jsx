import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const sanitizeHtml = require('sanitize-html')

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const isStrongPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        const hasNumberSequence = /(0123|1234|2345|3456|4567|5678|6789|7890)/;

        return regex.test(password) && !hasNumberSequence.test(password);
      };
      
      const handleRegister = async (e) => {
        console.log("inside handle register");
        e.preventDefault();
        setMessage("");
      
        if (!isStrongPassword(password)) {
            setMessage(
                "Password must be at least 8 characters, include uppercase, lowercase, number, special character, and must not contain 3 or more consecutive numbers (e.g. 123, 4567)."
              );
            setPassword(""); // Clears the password field

          return;
        }
      
        try {
          console.log("inside try");
          try {
            username = sanitizeHtml(username);
            password = sanitizeHtml(password);
          } catch (err) {
            console.error("Sanitization failed:", err);
          }
      
          console.log("running the api next");
          const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
      
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem("token", data.token); 
            navigate("/home");
          } else {
            setMessage(data.message || "Registration failed");
          }
        } catch (error) {
          setMessage("Failed to connect to the server.");
        }
      };
      
      


  return (
    <div
      style={{
        backgroundColor: '#f1d6d4',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        padding: '40px',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '40px' }}>
        Register Here
      </h1>
      <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="create a username"
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: '80%',
          maxWidth: '500px',
          padding: '20px',
          borderRadius: '40px',
          border: 'none',
          marginBottom: '20px',
          backgroundColor: '#e1bdbb',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#777',
          boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
        }}
      />

      <input
        type="password"
        placeholder="create a password"
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: '80%',
          maxWidth: '500px',
          padding: '20px',
          borderRadius: '40px',
          border: 'none',
          marginBottom: '30px',
          backgroundColor: '#e1bdbb',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#777',
          boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
        }}
      />

      <button
        style={{
          backgroundColor: '#d36d60',
          color: '#000',
          padding: '15px 50px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '40px',
          cursor: 'pointer',
        }}
      >
        Register
      </button>
      </form>
      {message && (<p style={{ color: "red", marginTop: "15px", fontWeight: "bold" }}>{message}</p>)}

    </div>
  );
}
