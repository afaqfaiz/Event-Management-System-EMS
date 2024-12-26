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
        setmsg("Client registered Successfully")

        alert("Signup successful!");
        navigate('/login')
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
          <label>
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
          <label>
            Password:
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
          <label htmlFor=""> Contact
          <input 
              className="email"
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact" 
              required />
          </label>
          <label htmlFor=""> Address
          <input 
              className="email"
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              placeholder="Address" 
              required />
          </label>
          <label for="imgUrl">Image URL:
              <input className="email"
                  type="text"
                  name="imgurl"
                  value={formData.imgurl}
                  onChange={handleChange}
                    placeholder="image url"
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












// // React Components and Server Routes with CSS, bcrypt, and JWT Authentication

// // React Components

// function ClientRegister() {
//   const [clientData, setClientData] = useState({
//     clientImage: "",
//     clientName: "",
//     clientContact: "",
//     clientEmail: "",
//     clientAddress: "",
//     clientPassword: "",
//   });

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/register/client", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(clientData),
//       });
//       alert("Registration successful: " + response.message);
//     } catch (error) {
//       alert("Error registering: " + error.message);
//     }
//   };

//   return (
//     <div className="container">
//       <form className="card" onSubmit={handleRegister}>
//         <h2>Client Register</h2>
//         <input type="text" placeholder="Name" value={clientData.clientName} onChange={(e) => setClientData({ ...clientData, clientName: e.target.value })} required />
//         <input type="text" placeholder="Contact" value={clientData.clientContact} onChange={(e) => setClientData({ ...clientData, clientContact: e.target.value })} required />
//         <input type="email" placeholder="Email" value={clientData.clientEmail} onChange={(e) => setClientData({ ...clientData, clientEmail: e.target.value })} required />
//         <input type="text" placeholder="Address" value={clientData.clientAddress} onChange={(e) => setClientData({ ...clientData, clientAddress: e.target.value })} required />
//         <input type="password" placeholder="Password" value={clientData.clientPassword} onChange={(e) => setClientData({ ...clientData, clientPassword: e.target.value })} required />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// function CompanyLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/company/login", {
//         Company_Email: email,
//         Company_password: password,
//       });
//       alert("Login successful: " + response.data.message);
//     } catch (error) {
//       alert("Error logging in: " + error.response.data.message);
//     }
//   };

//   return (
//     <div className="container">
//       <form className="card" onSubmit={handleLogin}>
//         <h2>Company Login</h2>
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// function CompanyRegister() {
//   const [companyData, setCompanyData] = useState({
//     companyImgUrl: "",
//     companyName: "",
//     companyContact: "",
//     companyEmail: "",
//     companyAddress: "",
//     companyOwner: "",
//     companyPassword: "",
//   });

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/register/company", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(companyData),
//       });
//       alert("Registration successful: " + response.message);
//     } catch (error) {
//       alert("Error registering: " + error.message);
//     }
//   };

//   return (
//     <div className="container">
//       <form className="card" onSubmit={handleRegister}>
//         <h2>Company Register</h2>
//         <input type="text" placeholder="Name" value={companyData.companyName} onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })} required />
//         <input type="text" placeholder="Contact" value={companyData.companyContact} onChange={(e) => setCompanyData({ ...companyData, companyContact: e.target.value })} required />
//         <input type="email" placeholder="Email" value={companyData.companyEmail} onChange={(e) => setCompanyData({ ...companyData, companyEmail: e.target.value })} required />
//         <input type="text" placeholder="Address" value={companyData.companyAddress} onChange={(e) => setCompanyData({ ...companyData, companyAddress: e.target.value })} required />
//         <input type="text" placeholder="Owner" value={companyData.companyOwner} onChange={(e) => setCompanyData({ ...companyData, companyOwner: e.target.value })} required />
//         <input type="password" placeholder="Password" value={companyData.companyPassword} onChange={(e) => setCompanyData({ ...companyData, companyPassword: e.target.value })} required />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export { ClientLogin, ClientRegister, CompanyLogin, CompanyRegister };

// // // Server-side Routes
// // const express = require("express");
// // const bcrypt = require("bcrypt");
// // const jwt = require("jsonwebtoken");
// // const app = express();
// // const SECRET_KEY = "your_secret_key";

// // app.use(express.json());

// // // Dummy database
// // const users = { clients: [], companies: [] };

// // // Client Login Route
// // app.post("/api/client/login", async (req, res) => {
// //   const { Client_Email, Client_Password } = req.body;
// //   const user = users.clients.find((u) => u.clientEmail === Client_Email);
// //   if (!user || !(await bcrypt.compare(Client_Password, user.clientPassword))) {
// //     return res.status(401).send({ message: "Invalid credentials." });
// //   }
// //   const token = jwt.sign({ email: Client_Email }, SECRET_KEY);
// //   res.send({ message: "Login successful!", token });
// // });

// // // Client Register Route
// // app.post("/api/register/client", async (req, res) => {
// //   const { clientImage, clientName, clientContact, clientEmail, clientAddress, clientPassword } = req.body;
// //   const hashedPassword = await bcrypt.hash(clientPassword, 10);
// //   users.clients.push({ clientImage, clientName, clientContact, clientEmail, clientAddress, clientPassword: hashedPassword });
// //   res.send({ message: "Client registered successfully!" });
// // });

// // // Company Login Route
// // app.post("/api/company/login", async (req, res) => {
// //   const { Company_Email, Company_password } = req.body;
// //   const user = users.companies.find((u) => u.companyEmail === Company_Email);
// //   if (!user || !(await bcrypt.compare(Company_password, user.companyPassword))) {
// //     return res.status(401).send({ message: "Invalid credentials." });
// //   }
// //   const token = jwt.sign({ email: Company_Email }, SECRET_KEY);
// //   res.send({ message: "Login successful!", token });
// // });

// // // Company Register Route
// // app.post("/api/register/company", async (req, res) => {
// //   const { companyImgUrl, companyName, companyContact, companyEmail, companyAddress, companyOwner, companyPassword } = req.body;
// //   const hashedPassword = await bcrypt.hash(companyPassword, 10);
// //   users.companies.push({ companyImgUrl, companyName, companyContact, companyEmail, companyAddress, companyOwner, companyPassword: hashedPassword });
// //   res.send({ message: "Company registered successfully!" });
// // });

// // app.listen(5000, () => console.log("Server running on port 5000"));

// // CSS
// // const styles = `
// // .container {
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   height: 100vh;
// //   background: linear-gradient(135deg, #74ebd5, #9face6);
// // }

// // .card {
// //   background: rgba(255, 255, 255, 0.8);
// //   padding: 20px;
// //   border-radius: 10px;
// //   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// //   text-align: center;
// //   max-width: 400px;
// //   width: 100%;
// // }

// // .card input {
// //   display: block;
// //   width: 100%;
// //   padding: 10px;
// //   margin: 10px 0;
// //   border: 1px solid #ccc;
// //   border-radius: 5px;
// // }

// // .card button {
// //   background: #6a11cb;
// //   background: linear-gradient(to right, #2575fc, #6a11cb);
// //   color: white;
// //   padding: 10px 20px;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   transition: background 0.3s;
// // }

// // .card button:hover
