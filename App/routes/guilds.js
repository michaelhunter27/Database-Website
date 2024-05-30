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
            res.render('guilds', { guilds });
        }
    });
});

router.post('/add', (req, res) => {
    const { name, creation_date } = req.body;
    const addGuildQuery = `INSERT INTO Guilds (name, creation_date) VALUES ('${name}', '${creation_date}');`;

    db.query(addGuildQuery, (err, results) => {
        if (err) {
            console.error('Error inserting guild:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/guilds');
        }
    });
});

router.put('/update', (req, res) => {
    const { guildID, name, creation_date } = req.body;
    const updateGuildQuery = `UPDATE Guilds SET name = '${name}', creation_date = '${creation_date}' WHERE guildID = ${guildID};`;

    db.query(updateGuildQuery, (err, result) => {
        if (err) {
            console.error('Error updating guild:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const selectGuildQuery = `SELECT * FROM Guilds WHERE guildID = ${guildID};`;
            db.query(selectGuildQuery, (err, result) => {
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
    const deleteGuildQuery = `DELETE FROM Guilds WHERE guildID = ${guildID};`;

    db.query(deleteGuildQuery, (err, results) => {
        if (err) {
            console.error('Error deleting guild:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.sendStatus(204);
        }
    });
});

module.exports = router;