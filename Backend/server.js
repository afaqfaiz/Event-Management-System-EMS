// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');  // Import database connection

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Define routes here
app.get('/', (req, res) => {
    res.send('Event Management API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/api/companies', (req, res) => {
    db.query('SELECT * FROM Company', (err, results) => {
        if (err) {
            console.error('Error fetching companies:', err); // Log error to console
            res.status(500).send({ error: 'Database query error' });
        } else {
            console.log('Fetched companies:', results); // Log results to console
            res.json(results);
        }
    });
});


app.get('/api/companies1', (req, res) => {
    db.query('SELECT * FROM Company where  Company_ID = 1', (err, results) => {

        if (err) {
            console.error('Error fetching companies:', err); // Log error to console
            res.status(500).send({ error: 'Database query error' });
        } else {
            console.log('Fetched companies:', results); // Log results to console
            res.json(results);
        }
    });
});


//------------------------------------------- Route for company registration--------------------------------------------------------------------------------
app.post('/api/register/company', (req, res) => {
    const {
        companyName: Company_Name,
      companyContact: Company_Contact,
      companyEmail: Company_Email,
      companyAddress: Company_Address,
      companyOwner: Company_Owner,
      companyPassword: Company_password
     } = req.body;
 
    // Query to insert the new company user
    db.query(
        'INSERT INTO Company (Company_Name,Company_Contact,Company_Email,Company_Address,Company_Owner,Company_password) VALUES (?, ?, ?,?,?,?)',
        [Company_Name,Company_Contact,Company_Email,Company_Address,Company_Owner,Company_password],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send("Username already exists.");
                }
                return res.status(500).send(err);
            }
            res.status(201).send("Company registered successfully");
        }
    );
});




app.post('/hello', function(req, res){
   res.send("You just called the post method at '/hello'!\n");
});