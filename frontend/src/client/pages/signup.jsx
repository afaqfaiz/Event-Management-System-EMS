import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../client-css/signup.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    Address: "",
    imgurl: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/register/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        setMsg("Client registered successfully!");
        alert("Signup successful!");
        navigate("/login");
      } else {
        setMsg("");
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setMsg("");
      setError("Failed to connect. Please try again.");
    }
  };

  return (
    <div className="body-container">
      <div className="signup-page">
        <h2 className="main-heading">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <label>
            Name:
            <input
              className="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </label>
          {/* Other form fields */}
          {error && <p className="error">{error}</p>}
          {msg && <p className="success">{msg}</p>}
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
