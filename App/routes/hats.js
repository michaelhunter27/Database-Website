/* 
  Michael Hunter and Ryan Giard
  CS 340 group 91
  hats.js
  Routes for hats page
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
    const selectHatsQuery = 'SELECT * FROM Hats';
    db.query(selectHatsQuery, (err, results) => {
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

    const addHatQuery = 'INSERT INTO Hats (name, description, rarity, price) VALUES (?, ?, ?, ?)';
    const queryParams = [name, description, rarity, price];
    db.query(addHatQuery, queryParams, (err, result) => {
        if (err) {
            console.error('Error adding hats:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/hats');
        }
    });
});

module.exports = router;