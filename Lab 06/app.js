const express = require('express');
const path = require('path');

const calculatorRoute = require('./Calculator Code/routes/calculatorRoute'); // includes the space

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'Calculator Code/public')));

// API routes
app.use('/api/calculator', calculatorRoute);

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Calculator Code/public', 'calculatorstruct.html'));
});

module.exports = app;
