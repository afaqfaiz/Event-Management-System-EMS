import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../admin.css/Login.css";
import {useAuthStore} from "../store/authStore"
const LoginPage = () => {
    const { setuser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/api/admin/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
      
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed. Please try again.");
        }
      
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store JWT token
        setuser(data.admin);
        setError("");
        navigate("/"); // Navigate to admin dashboard
      } catch (err) {
        setError(err.message || "Failed to connect to the server. Please try again later.");
      }
      
  };

  return (
    <div className="login-body">
    <div className="login-container">
      <div className="login-form">
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
