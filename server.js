const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// SQLite Database setup
const db = new sqlite3.Database('./library_management.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err);
    } else {
        console.log('Connected to the SQLite database');

        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS Users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    role TEXT CHECK( role IN ('Librarian', 'User') ) NOT NULL
                )
            `);

            db.run(`
                CREATE TABLE IF NOT EXISTS Books (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    author TEXT NOT NULL,
                    quantity INTEGER NOT NULL
                )
            `);

            db.run(`
                CREATE TABLE IF NOT EXISTS BorrowRequests (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    book_id INTEGER,
                    start_date TEXT NOT NULL,
                    end_date TEXT NOT NULL,
                    status TEXT CHECK( status IN ('Pending', 'Approved', 'Denied') ) DEFAULT 'Pending',
                    FOREIGN KEY (user_id) REFERENCES Users(id),
                    FOREIGN KEY (book_id) REFERENCES Books(id)
                )
            `);

            db.run(`
                CREATE TABLE IF NOT EXISTS BorrowHistory (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    book_id INTEGER,
                    borrowed_on TEXT NOT NULL,
                    returned_on TEXT,
                    FOREIGN KEY (user_id) REFERENCES Users(id),
                    FOREIGN KEY (book_id) REFERENCES Books(id)
                )
            `);
        });
    }
});

// Import routes 
const librarianRoutes = require('./routes/librarian'); 
const userRoutes = require('./routes/user'); 

// Use routes 
app.use('/api', librarianRoutes); 
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

