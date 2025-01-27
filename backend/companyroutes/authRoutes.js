const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connection } = require('../db'); // Import the DB connection
const router = express.Router();
require('dotenv').config();


// Update company details API
router.put('/updatecompany', (req, res) => {
  const { companyId, name, address, email, phone, owner, imgurl } = req.body;

  // Validate required fields
  if (!companyId || !name || !address || !email || !phone || !owner || !imgurl) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Query to update company details
  const query = `UPDATE Company SET 
    Company_name = ?, 
    Company_address = ?, 
    Company_email = ?, 
    Company_Contact = ?, 
    Company_Owner = ?, 
    Company_img_url = ? 
    WHERE Company_ID = ?`;

  const values = [name, address, email, phone, owner, imgurl, companyId];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    res.status(200).json({ message: 'Company details updated successfully!' });
  });
});


// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM Company WHERE Company_Email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const company = results[0];

    const isMatch = await bcrypt.compare(password, company.Company_password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ companyId: company.Company_ID }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      companyId: company.Company_ID,
      companyName: company.Company_Name,
      companyEmail:company.Company_Email,
      companyAddress: company. Company_Address,
      companyContact: company.Company_Contact,
      companyOwner: company.Company_Owner,
      companyImgUrl: company.Company_img_url,
    });
  });
});

// Route for user signup
router.post('/signup', async (req, res) => {
  const { name, contact, email, Address, companyOwner, password, imgurl } = req.body;
const companyName=name;
const companyContact=contact;
const companyEmail=email;
const companyAddress=Address;
// const companyOwner=companyOwner;
const companyPassword=password;
const companyImgUrl=imgurl;
  // Validate required fields
  if (!companyContact ||!companyAddress || !companyOwner || !companyImgUrl || !companyName || !companyEmail || !companyPassword) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Check if company with the same email already exists
  connection.query('SELECT * FROM Company WHERE Company_Email = ?', [companyEmail], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Company with this email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(companyPassword, 10);

    // Insert new company into the database
    connection.query(
      'INSERT INTO Company (Company_Name, Company_Contact, Company_Email, Company_Address, Company_Owner, Company_password, Company_img_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [companyName, companyContact, companyEmail, companyAddress, companyOwner, hashedPassword, companyImgUrl],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Error registering company' });
        }

        const newCompanyId = results.insertId;

        // Generate JWT token for the new user
        const token = jwt.sign({ companyId: newCompanyId }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({
          message: 'Company registered successfully',
          token,
          companyId: newCompanyId,
          companyName
        });
      }
    );
  });
});

module.exports = router;
