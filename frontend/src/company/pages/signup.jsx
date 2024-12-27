import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../client/client-css/signup.css";
const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    companyOwner:"",
    email: "",
    password: "",
    contact: "",
    Address:"",
    imgurl:""
  });
  const [error, setError] = useState("");
  const [msg, setmsg]=useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("http://localhost:5000/api/company/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        setmsg("Client registered Successfully")

        alert("Signup successful!");
        navigate('/companylogin')
      } else {
        setmsg("");
        setError(data.message || "Signup failed");
      }
    } catch (err) {
       setmsg("");
      setError("Failed to connect. Please try again.");
    }
  };

  return (
    <div className="body-container">
      <div className="signup-page">
        <h2 className="main-heading">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <label>
          Company Name:
            <input
              className="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full company name"
              required
            />
          </label>
          <label>
          Company Owner:
            <input
              className="name"
              type="text"
              name="companyOwner"
              value={formData.companyOwner}
              onChange={handleChange}
              placeholder=" owner name"
              required
            />
          </label>
          <label>
          Company Email:
            <input
              className="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter company's email"
              required
            />
          </label>
          <label>
          Company Password:
            <input
              className="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </label>
          <label htmlFor=""> 
          Company Contact
          <input 
              className="email"
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder=" Company's Contact" 
              required />
          </label>
          <label htmlFor=""> 
          Company Address
          <input 
              className="email"
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              placeholder="Company's Address" 
              required />
          </label>
          <label for="imgUrl"> 
          Company Image/Logo URL:
              <input className="email"
                  type="text"
                  name="imgurl"
                  value={formData.imgurl}
                  onChange={handleChange}
                    placeholder="Company's image url"
                    required/>
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
