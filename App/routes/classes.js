/* 
  Michael Hunter and Ryan Giard
  CS 340 group 91
  App.js
*/

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Display all classes
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Classes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching classes:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('classes', { classes: results });
        }
    });
});

// CREATE a new class
router.post('/add', (req, res) => {
    const { name, description } = req.body;
    const query = 'INSERT INTO Classes (name, description) VALUES (?, ?)';
    db.query(query, [name, description], (error, result) => {
        if (error) {
            console.error('Error adding class:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/classes');
        }
    });
});

// UPDATE class
router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const query = 'UPDATE Classes SET name = ?, description = ? WHERE id = ?';
    db.query(query, [name, description, id], (error, result) => {
        if (error) {
            console.error('Error updating class:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/classes');
        }
    });
});

// DELETE class
router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Classes WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (error) {
            console.error('Error deleting class:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/classes');
        }
    });
});

module.exports = router;