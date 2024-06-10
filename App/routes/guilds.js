/* 
  Michael Hunter and Ryan Giard
  CS 340 group 91
  guilds.js
  Routes for guilds page
*/
/*
  Code citation:
    Code for these routes is adapted from the nodejs starter app.
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Display all guilds
router.get('/', (req, res) => {
    const guildsQuery = `SELECT * FROM Guilds;`;

    db.query(guildsQuery, (err, results) => {
        if (err) { 
            console.error('Error fetching guilds:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const guilds = results;
            res.render('guilds', { guilds: guilds });
        }
    });
});

// CREATE a new guild
router.post('/add', (req, res) => {
    const { name, creation_date } = req.body;
    const addGuildQuery = `INSERT INTO Guilds (name, creation_date) VALUES (?, ?);`;

    db.query(addGuildQuery, [name, creation_date], (err, results) => {
        if (err) {
            console.error('Error inserting guild:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/guilds');
        }
    });
});

// UPDATE a guild
router.put('/update', (req, res) => {
    const { guildID, name } = req.body;
    const updateGuildQuery = `UPDATE Guilds SET name = ? WHERE guildID = ?;`;

    db.query(updateGuildQuery, [name, guildID], (err, result) => {
        if (err) {
            console.error('Error updating guild:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const selectGuildQuery = `SELECT name FROM Guilds WHERE guildID = ?;`;
            db.query(selectGuildQuery, [guildID], (err, result) => {
                if (err) {
                    console.error('Error fetching updated guild:', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(result);
                }
            });
        }
    });
});

// DELETE a guild
router.delete('/delete', (req, res) => {
    const { guildID } = req.body;
    const deleteGuildQuery = `DELETE FROM Guilds WHERE guildID = ?;`;

    db.query(deleteGuildQuery, [guildID], (err, results) => {
        if (err) {
            console.error('Error deleting guild:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.sendStatus(204);
        }
    });
});

module.exports = router;
