const express = require('express');
const router = express.Router();
const db = require('../db');
const basicAuth = require('../middleware/auth');

// Create a new library user
router.post('/users', basicAuth, (req, res) => {
    const { email, password, role } = req.body;
    const query = 'INSERT INTO Users (email, password, role) VALUES (?, ?, ?)';
    db.run(query, [email, password, role], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// View all book borrow requests
router.get('/borrow-requests', basicAuth, (req, res) => {
    const query = 'SELECT * FROM BorrowRequests';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Approve a borrow request
router.put('/borrow-requests/:id/approve', basicAuth, (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE BorrowRequests SET status = ? WHERE id = ?';
    db.run(query, ['Approved', id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Borrow request approved' });
    });
});

// Deny a borrow request
router.put('/borrow-requests/:id/deny', basicAuth, (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE BorrowRequests SET status = ? WHERE id = ?';
    db.run(query, ['Denied', id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Borrow request denied' });
    });
});

// View a user's borrow history
router.get('/users/:id/history', basicAuth, (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT BorrowHistory.*, Books.title, Books.author
        FROM BorrowHistory
        JOIN Books ON BorrowHistory.book_id = Books.id
        WHERE BorrowHistory.user_id = ?`;
    db.all(query, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

module.exports = router;
