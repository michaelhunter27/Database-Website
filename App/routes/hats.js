/* 
  Michael Hunter and Ryan Giard
  CS 340 group 91
  hats.js
*/

/*
  Code citation:
    Code for these routes is adapted from the examples in the nodejs starter app.
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Display all hats
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Hats';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching hats:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('hats', { hats: results });
        }
    });
});

// CREATE a new hat
router.post('/add', (req, res) => {
    let { name, description, rarity, price } = req.body;

    if (isNaN(price)) {
      price = 'NULL';
    }

    const query = 'INSERT INTO Hats (name, description, rarity, price) VALUES (?, ?, ?, ?)';
    db.query(query, [name, description, rarity, price], (err, result) => {
        if (err) {
            console.error('Error adding hats:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/hats');
        }
    });
});

module.exports = router;