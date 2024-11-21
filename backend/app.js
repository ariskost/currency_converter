const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:8080', // Dynamically load from .env
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP Methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed Headers
    })
);

app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const currencyRoutes = require('./routes/currencyRoutes');

app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/currencies', currencyRoutes); // Currency routes

// Default route
app.get('/', (request, response) => {
    response.send('Currency Calculator API is running.');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
