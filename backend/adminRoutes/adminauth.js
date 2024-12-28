const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connection } = require('../db');
const router = express.Router();
require('dotenv').config();



// Admin Login API
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log("in login");

 
  if (!email || !password) {
    console.log("0");
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  
  const query = 'SELECT * FROM admin WHERE email = ?';
  console.log("hmm");
  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.log("1");
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal server error.' });
    }

    
    if (results.length === 0) {
      console.log("2");
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const admin = results[0];

   
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      console.log("3");
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    
    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );
//
    console.log(admin);    
    res.status(200).json({
      message: 'Login successful',
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
  });
});

// Middleware for token authentication (example)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token required.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.user = user; // Attach user info to the request
    next();
  });
};

// Admin Change Password API
router.put('/change/password', authenticateToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
  
    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required.' });
    }
  
    try {
      // Get the admin's information from the database
      const query = 'SELECT * FROM admin WHERE id = ?';
      connection.query(query, [req.user.id], async (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Internal server error.' });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: 'Admin not found.' });
        }
  
        const admin = results[0];
  
        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Current password is incorrect.' });
        }
  
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
  
        // Update the password in the database
        const updateQuery = 'UPDATE admin SET password = ? WHERE id = ?';
        connection.query(updateQuery, [hashedPassword, req.user.id], (err, updateResult) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to update password.' });
          }
  
          res.status(200).json({ message: 'Password updated successfully.' });
        });
      });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  });
  

module.exports = router;
