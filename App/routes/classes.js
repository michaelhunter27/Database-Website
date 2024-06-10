/* 
  Michael Hunter and Ryan Giard
  CS 340 group 91
  classes.js
  Routes for classes page
*/

/*
  Code citation:
    Code for these routes is adapted from the examples in the nodejs starter app.
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Display all classes
router.get('/', (req, res) => {
    const selectClassesQuery = 'SELECT * FROM Classes';
    db.query(selectClassesQuery, (err, results) => {
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
    const addClassQuery = 'INSERT INTO Classes (name, description) VALUES (?, ?)';
    db.query(addClassQuery, [name, description], (err, result) => {
        if (err) {
            console.error('Error adding class:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/classes');
        }
    });
});

// UPDATE class
router.put('/update', (req, res) => {
    const { classID, name, description } = req.body;
    const updateClassQuery = 'UPDATE Classes SET name = ?, description = ? WHERE classID = ?';
    db.query(updateClassQuery, [name, description, classID], (err, result) => {
        if (err) {
            console.error('Error updating class:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const selectClassQuery = 'SELECT * FROM Classes WHERE classID = ?';
            db.query(selectClassQuery, [classID], (err, result) => {
                if (err) {
                    console.error('Error updating class:', err);
                    res.status(500).send('Internal Server Error');
                }
                else {
                    res.send(result);
                }
            })
        }
    });
});

// DELETE class
router.delete('/delete', (req, res) => {
    const { id } = req.body;
    const deleteClassQuery = 'DELETE FROM Classes WHERE classID = ?';
    db.query(deleteClassQuery, [id], (err, result) => {
        if (err) {
            console.error('Error deleting class:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.sendStatus(204);
        }
    });
});

module.exports = router;