const express = require('express');
const Document = require('../models/Document');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Get all documents for the logged-in user
router.get('/', verifyToken, async (req, res) => {
    try {
        // Fetch documents only for the logged-in user
        const documents = await Document.find({ owner: req.user.id });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single document by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Check if the document belongs to the logged-in user
        if (document.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to access this document' });
        }

        res.json(document);
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new document
router.post('/', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    try {
        const newDocument = await Document.create({
            title,
            content,
            owner: req.user.id,  // Associate the document with the logged-in user
        });
        res.json(newDocument);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a document
router.put('/:id', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Check if the document belongs to the logged-in user
        if (document.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this document' });
        }

        // Update the document
        const updatedDocument = await Document.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        res.json(updatedDocument);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a document
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Check if the document belongs to the logged-in user
        if (document.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this document' });
        }

        // Delete the document
        await Document.findByIdAndDelete(req.params.id);
        res.json({ message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
