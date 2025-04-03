import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const isStrongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const hasNumberSequence = /(0123|1234|2345|3456|4567|5678|6789|7890)/;

    return regex.test(password) && !hasNumberSequence.test(password);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous message
  
    // Check if newPassword and confirmPassword match
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }
  
    // Check if newPassword is strong
    if (!isStrongPassword(formData.newPassword)) {
        setMessage(
            "Password must be at least 8 characters, include uppercase, lowercase, number, special character, and must not contain 3 or more consecutive numbers (e.g. 123, 4567)."
          );
        return;
    }
  
    try {
      const res = await fetch("http://localhost:3000/api/auth/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setMessage("Password updated successfully.");
        setTimeout(() => {
            navigate("/home");
          }, 500);          
        setFormData({
          username: "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => {
            navigate("/home");
          }, 500); 
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };
  
  

  // 💅 Styling (unchanged)
  const containerStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #eee",
    borderRadius: "8px",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#d36d60",
    border: "2px solid #fff",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  };

  const titleStyle = {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "30px",
    color: "#222",
  };

  return (
    <form onSubmit={handleSubmit} style={containerStyle}>
      <h2 style={titleStyle}>Change password</h2>

      <label style={labelStyle}>Username</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <label style={labelStyle}>Current Password</label>
      <input
        type="password"
        name="currentPassword"
        value={formData.currentPassword}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <label style={labelStyle}>New Password</label>
      <input
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <label style={labelStyle}>Confirm New Password</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <button type="submit" style={buttonStyle}>
        Update password
      </button>
      {message && (
  <p style={{ color: message.startsWith("✅") ? "green" : "red", marginTop: "15px", fontWeight: "bold" }}>
    {message}
  </p>
)}

    </form>
    
  );
};

export default ChangePassword;
