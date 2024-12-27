const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connection } = require('../db'); // Import the DB connection
const router = express.Router();
require('dotenv').config();



// Client Registration API
router.post("/signup", async (req, res) => {
    const { name, email, password, contact, address, imgurl } = req.body;
    //name, email, password, contact, Address, imgurl
    const Address =address;
    // Check if all required fields are provided
    if (!name || !email || !password || !contact || !Address || !imgurl) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    // Check if the email is already registered
    connection.query(
      "SELECT * FROM Client WHERE Client_Email = ?",
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Database error." });
        }
  
        if (result.length > 0) {
          return res.status(400).json({ message: "Email already registered." });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Insert client details into the database
        const query = `INSERT INTO Client (Client_Name, Client_ContactNumber, Client_Email, Client_Address, Client_img_url, Client_Password) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [name, contact, email, Address, imgurl, hashedPassword];
  
        connection.query(query, values, (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Failed to register client." });
          }
          res.status(201).json({ message: "Client registered successfully!" });
        });
      }
    );
  });


  router.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
  
    // Retrieve client data from database by email
    connection.query(
      "SELECT * FROM Client WHERE Client_Email = ?",
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Database error." });
        }
  
        if (result.length === 0) {
          return res.status(400).json({ message: "Client not found." });
        }
  
        const client = result[0];
  
        // Compare password with hashed password in database
        const isPasswordValid = await bcrypt.compare(password, client.Client_Password);
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid credentials." });
        }
  
        // Generate JWT token
        const token = jwt.sign(
          {
            clientId: client.Client_ID,
            name: client.Client_Name,
            email: client.Client_Email,
            contact: client.Client_ContactNumber,
            address: client.Client_Address,
            imgurl: client.Client_img_url,
          },
          process.env.SECRET_KEY, // Use a secure secret
          { expiresIn: "1h" }
        );
  
        const clientDetails = {
            clientId: client.Client_ID,
            name: client.Client_Name,
            email: client.Client_Email,
            contact: client.Client_ContactNumber,
            address: client.Client_Address,
            imgurl: client.Client_img_url,
          };
    
          res.status(200).json({ message: 'Login successful', client: clientDetails, token });
      }
    );
  });
  
  module.exports = router;