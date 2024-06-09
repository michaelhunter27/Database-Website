const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/', (req, res) => {
    const accountsQuery = 'SELECT accountID, username, email, hashed_password, registration_date, last_login, active_status FROM Accounts;';
    db.query(accountsQuery, (error, results) => {
        if (error) {
            res.sendStatus(500);
            return;
        }
        res.render('accounts', { accounts: results });
    });
});

router.post('/add', (req, res) => {
    const { username, email, hashed_password, registration_date, last_login, active_status } = req.body;
    const query = `INSERT INTO Accounts (username, email, hashed_password, registration_date, last_login, active_status)
                   VALUES (?, ?, ?, ?, ?, ?);`;
    db.pool.query(query, [username, email, hashed_password, registration_date, last_login, active_status], (error, results) => {
        if (error) {
            res.sendStatus(500);
            return;
        }
        res.redirect('/accounts');
    });
});

module.exports = router;