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

router.post('/add', function (req, res) {
    const { username, email, hashed_password, registration_date, last_login, active_status } = req.body;
    const addAccountQuery = `INSERT INTO Accounts (username, email, hashed_password, registration_date, last_login, active_status) VALUES (?, ?, ?, ?, ?, ?);`
    const queryParams = [username, email, hashed_password, registration_date, last_login, active_status];
    db.query(addAccountQuery, queryParams, (err, results) => {
        if (err) {
            console.error('Error inserting Account:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/accounts');
        }
    });
});

router.delete('/delete', (req, res) => {
    const { accountID } = req.body;
    const deleteAccountQuery = `DELETE FROM Accounts WHERE accountID = ?`;

    db.query(deleteAccountQuery, [accountID], (err, results) => {
        if (err) {
            console.error('Error deleteing account:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.sendStatus(204);
        }
    });
});

module.exports = router;