const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

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
