const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');

const photoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    filename: { type: String, required: true }
});

const Photo = mongoose.model('Photo', photoSchema);




// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Naming convention
    }
});
const upload = multer({ storage: storage });

// GET upload form
router.get('/', (req, res) => {
    res.render('upload', { errors: [] });
});

// POST upload form
router.post('/', [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required')
], upload.single('photo'), async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('upload', { errors: errors.array() });
    }

    const { title, description } = req.body;
    const filename = req.file ? req.file.filename : ''; // Handle the file

    const photo = new Photo({
        title,
        description,
        filename
    });

    try {
        await photo.save();
        res.redirect('/'); // Redirect to home after successful upload
    } catch (err) {
        console.error(err); // Log errors
        res.status(500).send('Server Error');
    }
});

module.exports = router;
