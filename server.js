const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connec Database
connectDB();

// Init middleware
app.use(express.json({extended: false}));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/verify', require('./routes/verify'));
app.use('/api/expenses', require('./routes/expenses'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	);
}

const port = process.env.port || 5000;

app.listen(port, console.log(`Server is running at port ${port}`));
