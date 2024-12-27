const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./db');
const authRoutes = require('./companyroutes/authRoutes');
const hallRoutes = require('./companyroutes/HallRoutes')
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/company', authRoutes);

app.use('/api/hall', hallRoutes);

// Connect to Database
connectDB();


// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
