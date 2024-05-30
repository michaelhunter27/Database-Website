const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/add', function (req, res) {
    res.render('addguild');
});

router.post('/add', function (req, res) {
    const { name, creation_date } = req.body;

    if (!name || !creation_date) {
        return res.status(400).render('addguild', { error: 'Name and creation date are required.' });
    }

    const insertQuery = `
        INSERT INTO Guilds (name, creation_date)
        VALUES (?, ?)
    `;
    db.query(insertQuery, [name, creation_date], function (err, result) {
        if (err) {
            console.error('Error inserting guild:', err);
            return res.status(500).send('Error adding guild.');
        }
       
        res.redirect('/guilds');
    });
});

module.exports = router;