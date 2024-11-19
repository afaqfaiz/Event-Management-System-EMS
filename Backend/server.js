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

//select all companies
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

//select from company by id 
app.get('/api/companies1', (req, res) => {
    db.query('SELECT * FROM Company where  Company_ID = 3', (err, results) => {

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



//------------------------------------------- Route for company login-------------------------------------------------------------------------------

//----------------company login authentication
app.post('/api/company/login', (req, res) => {
    const { Company_Email, Company_password } = req.body;
    // Company_password=password;
    // Company_Email=email;
    console.log(Company_Email);
    console.log(Company_password);
    if (!Company_Email || !Company_password) {
        return res.status(400).send('email and password are required');
    }

    const query = 'SELECT * FROM Company WHERE Company_Email = ? AND Company_password = ?';
    db.query(query, [Company_Email, Company_password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            res.status(200).send('Login successful!');
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
});

//----------------company data fetching

app.get('/api/company/data/:email',(req,res)=>{
    const Company_Email= req.params.email;
    console.log('Received request for email:', Company_Email);
    //first fetch the company name and id 
    const nameidquery='select * from Company where Company_Email=?';
    db.query(nameidquery,[Company_Email],(err,result)=>{
        if(err){
            console.error('Error executing query:',err);
            return res.status(500).json({error: 'server error'});
        }
        console.log('Query Result:', result);
        if(result.length>0){
            console.log('Query Result:', result);
            res.json({
                Company_Name:result[0].Company_Name,
                Company_ID:result[0].Company_ID,
                Company_Email:result[0].Company_Email,
                Company_Owner:result[0].Company_Owner,
                Company_Contact:result[0].Company_Contact,
                Company_Address:result[0].Company_Address,

            });  
        }
        else{
            return res.status(404).json({error: 'company not found'});
            console.log("not found");
        }
    })
})

//------------------- get the comapany halls by id
app.get('/api/company/halls/:id',(req,res)=>{
    const Company_ID=req.params.id;
    console.log('Received request for company id:', Company_ID);
    const queryhalls= 'select * from Hall where Company_ID=?';
    db.query(queryhalls,[Company_ID],(err,result)=>{
        if(err){
            console.error("error fetching halls",err);
            return res.status(500).json({ error: 'Database error' })
        }
        
        return res.json(result);
    })
})

//--------------------register halls by comapny id 
app.post('/api/hall/register', (req, res) => {
    const { Company_ID, Hall_name, Hall_Capacity, Hall_location, Price_per_Hour } = req.body;

    if (!Company_ID || !Hall_name || !Hall_Capacity || !Hall_location || !Price_per_Hour) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // First, check if the hall already exists for this company
    const checkQuery = `SELECT * FROM Hall WHERE Company_ID = ? AND Hall_name = ?`;

    db.query(checkQuery, [Company_ID, Hall_name], (err, result) => {
        if (err) {
            console.error('Error checking existing hall:', err);
            return res.status(500).json({ error: 'Database error while checking hall' });
        }

        if (result.length > 0) {
            // Hall with the same name already exists
            return res.status(409).json({ error: 'Hall with this name already exists for the company' });
        }
        else
        {
                // Proceed to insert the hall if it doesn't already exist
                const insertQuery = `
                    INSERT INTO Hall (Company_ID, Hall_name, Hall_Capacity, Hall_location, Price_per_Hour) 
                    VALUES (?, ?, ?, ?, ?)
                `;

                db.query(insertQuery, [Company_ID, Hall_name, Hall_Capacity, Hall_location, Price_per_Hour], (insertErr, insertResult) => {
                    if (insertErr) {
                        console.error('Error inserting hall:', insertErr);
                        return res.status(500).json({ error: 'Database error while registering hall' });
                    }

                    res.status(201).json({ message: 'Hall registered successfully', hallID: insertResult.insertId });
                });
        }
    });
});


//-------------delete hall by id
app.delete('/api/hall/:id', (req, res) => {
    const Hall_ID = req.params.id;

    const query = `DELETE FROM Hall WHERE Hall_ID = ?`;

    db.query(query, [Hall_ID], (err, result) => {
        if (err) {
            console.error('Error deleting hall:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Hall not found' });
        }

        res.status(200).json({ message: 'Hall deleted successfully' });
    });
});

// app.get('/api/halls', (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1]; // Extract the token

//     if (!token) {
//         return res.status(401).send('Unauthorized');
//     }

//     const companyId = getCompanyIdFromToken(token); // Decode token to get company ID

//     db.query('SELECT * FROM Hall WHERE Company_ID = ?', [companyId], (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json(results); // Send halls data
//     });
// });

// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.sendStatus(401);

//     jwt.verify(token, SECRET_KEY, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// };
