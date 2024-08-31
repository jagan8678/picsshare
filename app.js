const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const indexRouter = require('./routes/index');
const uploadRouter = require('./routes/upload');

const app = express();

mongoose.connect('mongodb+srv://test:test@cluster0.wiecoxl.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())

// Set EJS as view engine
app.set('view engine', 'ejs');

// Routes
app.use('/', indexRouter);
app.use('/upload', uploadRouter);

// Start server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
