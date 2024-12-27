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
    address: "",
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
      const response = await fetch("http://localhost:5000/api/client/auth/signup", {
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
        navigate("/clientlogin");
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
          <label>
            Name:
            <input
              className="input-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </label>
          <label>
            Email:
            <input
              className="input-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </label>
          <label>
            Password:
            <input
              className="input-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </label>
          <label>
            Contact:
            <input
              className="input-contact"
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
              required
            />
          </label>
          <label>
            Address:
            <input
              className="input-address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </label>
          <label>
            Image URL:
            <input
              className="input-imgurl"
              type="text"
              name="imgurl"
              value={formData.imgurl}
              onChange={handleChange}
              placeholder="Enter the image URL"
              required
            />
          </label>
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
