const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connec Database
connectDB();

// Init middleware
app.use(express.json({extended: false}));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/verify', require('./routes/verify'));
app.use('/api/expenses', require('./routes/expenses'));

const port = process.env.port || 5000;

app.listen(port, console.log(`Server is running at port ${port}`));
