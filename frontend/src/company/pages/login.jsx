import React, { useState } from "react";
import "../../client/client-css/login.css"
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
const CompLoginPage = () => {
  const {setuser}=useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("http://localhost:5000/api/company/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        setuser(data.user);
        localStorage.setItem("Token",data.token);
        alert("Login successful!");
        console.log("token",data.token)
        navigate('/')
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Failed to connect. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <h2 className="main-heading">Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label" >
          Email:
          <input
            className="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </label>
        <label className="form-label">
          Password:
          <input
            className="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default CompLoginPage;
