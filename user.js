const express = require('express');
const router = express.Router();
const db = require('../db');
const basicAuth = require('../middleware/auth');

// Get list of all available books
router.get('/books', basicAuth, (req, res) => {
    const query = 'SELECT * FROM Books WHERE quantity > 0';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Submit a request to borrow a book
router.post('/borrow-requests', basicAuth, (req, res) => {
    const { user_id, book_id, start_date, end_date } = req.body;
    const query = 'INSERT INTO BorrowRequests (user_id, book_id, start_date, end_date) VALUES (?, ?, ?, ?)';
    db.run(query, [user_id, book_id, start_date, end_date], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// View the user's borrow history
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
