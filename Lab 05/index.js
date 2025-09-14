// require the express package
const express = require('express');
const path = require('path');

// Import my calculator routes
const calculatorRoute = require('./Calculator Code/routes/calculatorRoute');

// create an app using the express package
const app = express();

// set the port to 3000
const port = 3000;

// Middleware to parse JSON (needed for API requests)
app.use(express.json());

// Serve static files from the Calculator Code/public directory
app.use(express.static(path.join(__dirname, 'Calculator Code/public')));

// Use calculator routes for API endpoints
app.use('/api/calculator', calculatorRoute);

// Route to serve my calculator HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Calculator Code/public', 'calculatorstruct.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Calculator app listening at http://localhost:${port}`);
});