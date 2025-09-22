// index.js
const express = require('express');
const path = require('path');
const calculatorRoute = require('./Calculator Code/routes/calculatorRoute');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use calculator routes with the /api/calculator prefix
app.use('/api/calculator', calculatorRoute);

// Serve the calculator HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'calculatorstruct.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler - FIXED
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Calculator server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to use the calculator`);
});
