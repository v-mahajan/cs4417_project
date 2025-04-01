import React, { useState } from "react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // if (formData.newPassword !== formData.confirmPassword) {
    //   alert("New passwords do not match.");
    //   return;
    // }

    console.log("Password changed submitted:", formData);

    // Making the API call
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
        alert(data.message);
      } catch (error) {
        alert("Error updating password.");
      }

  };

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

      <label style={labelStyle}> New Password</label>
      <input
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <button type="submit" style={buttonStyle}>
        Update password
      </button>
    </form>
  );
};

export default ChangePassword;
