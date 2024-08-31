const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');

// Define the photo schema and model directly in this file
const photoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    filename: { type: String, required: true }
});

const Photo = mongoose.model('Photo', photoSchema);

// GET homepage and display all photos
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find(); // Fetch all photos from the database
        res.render('index', { photos });  // Render the index view with photos
    } catch (err) {
        res.status(500).send('Server Error');  // Handle any errors
    }
});

module.exports = router;
