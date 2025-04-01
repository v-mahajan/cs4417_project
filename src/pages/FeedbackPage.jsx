import React, { useState } from "react";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    
    // making API call
    try {
      const res = await fetch("http://localhost:3000/api/auth/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      alert(data.message || "Feedback submitted successfully!");
    } catch (err) {
      alert("Something went wrong. Try again.");
    }


  };

  const containerStyle = {
    minHeight: "100vh",
    //background: "linear-gradient(to bottom right, #2dd4bf, #60a5fa)",
    backgroundColor: "#fce8e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const formStyle = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "93%",
    padding: "10px 15px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  };

  const labelStyle = {
    marginBottom: "6px",
    fontWeight: "500",
    display: "block",
    color: "#333",
  };

  const buttonStyle = {
    backgroundColor: "#d36d60",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    width: "100%",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#222",
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={headingStyle}>Feedback Form</h2>

        <label style={labelStyle}>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Subject:</label>
        <input
          type="text"
          name="subject"
          placeholder="Enter subject"
          value={formData.subject}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Message:</label>
        <textarea
          name="message"
          placeholder="Enter message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          style={{ ...inputStyle, height: "100px", resize: "none" }}
          required
        ></textarea>

        <button type="submit" style={buttonStyle}>
          Submit →
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
