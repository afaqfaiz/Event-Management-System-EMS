const express = require("express");
const router = express.Router();
const { connection } = require("../db"); // Assuming you have a separate db.js file for MySQL connection

// GET all companies without password and image URL
router.get("/getallcompanies", (req, res) => {
  // SQL query to fetch all company details, excluding the password and img_url
  const query = `
    SELECT 
      Company_ID,
      Company_Name,
      Company_Contact,
      Company_Email,
      Company_Address,
      Company_Owner
    FROM Company
  `;

  // Execute query
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching companies:", err);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
    return res.status(200).json(results);
  });
});

router.delete('/deletecompany/:companyId', (req, res) => {
  const { companyId } = req.params;
  console.log("in delete");

  const query = `DELETE FROM Company WHERE Company_ID = ?`;

  connection.query(query, [companyId], (err, results) => {
    if (err) {
      console.error('Error deleting company:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    res.json({ message: 'Company deleted successfully.' });
  });
});

module.exports = router;
