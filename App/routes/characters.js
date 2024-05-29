/* 
  Michael Hunter and Ryan Giard
  CS 340 group 91
  characters.js
*/

// Routes for characters page

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Display all characters
router.get('/', (req, res) => {
    const charactersQuery = `SELECT characterID, Accounts.username AS 'username', Characters.name AS 'name', level, IFNULL(Classes.name, 'None') AS 'class', IFNULL(Guilds.name, 'None') AS 'guild' FROM Characters
                    INNER JOIN Accounts ON Characters.accountID = Accounts.accountID
                    LEFT JOIN Classes ON Characters.classID = Classes.classID
                    LEFT JOIN Guilds ON Characters.guildID = Guilds.guildID;`;

    db.query(charactersQuery, (err, results) => {
        if (err) {
            console.error('Error fetching characters:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const characters = results; // save result of previous query
            const accountsQuery = "SELECT * FROM Accounts;";

            db.query(accountsQuery, (err, results) => {
                if (err) {
                    console.error('Error fetching accounts:', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    const accounts = results; // save result of previous query
                    const classesQuery = "SELECT * FROM Classes;";

                    db.query(classesQuery, (err, results) => {
                        if (err) {
                            console.error('Error fetching classes:', err);
                            res.status(500).send('Internal Server Error');
                        } else {
                            const classes = results; // save result of previous query
                            const guildsQuery = "SELECT * FROM Guilds;";

                            db.query(guildsQuery, (err, results) => {
                                if (err) {
                                    console.error('Error fetching guilds:', err);
                                    res.status(500).send('Internal Server Error');
                                } else {
                                    const guilds = results; // save result of previous query
                                    const hatsQuery = "SELECT * FROM Hats;";

                                    db.query(hatsQuery, (err, results) => {
                                        if (err) {
                                            console.error('Error fetching hats:', err);
                                            res.status(500).send('Internal Server Error');
                                        } else {
                                            const hats = results;
                                            res.render('characters', { 
                                                characters: characters, 
                                                accounts: accounts, 
                                                classes: classes,
                                                guilds: guilds,
                                                hats: hats});
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

// CREATE a new class
router.post('/add', (req, res) => {
    const { accountID, name, level, classID, guildID } = req.body;
    const addCharacterQuery = `INSERT INTO Characters (accountID, name, level, classID, guildID) VALUES
                                (${accountID}, '${name}', ${level}, ${classID}, ${guildID});`
    db.query(addCharacterQuery, (err, results) => {
        if (err) {
            console.error('Error inserting character:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/characters');
        }
    });
});

// UPDATE character
router.put('/update', (req, res) => {
    const { characterID, accountID, name, level, classID, guildID} = req.body;
    
    const updateCharacterQuery = `UPDATE Characters SET accountID = ${accountID}, name = '${name}', level = ${level}, classID = ${classID}, guildID = ${guildID} WHERE characterID = ${characterID}`
    
    db.query(updateCharacterQuery, (err, result) => {
        if (err) {
            console.error('Error updating character:', error);
            res.status(500).send('Internal Server Error');
        } else {
            const selectCharacterQuery = `SELECT characterID, Accounts.username AS 'username', Characters.name AS 'name', level, IFNULL(Classes.name, 'None') AS 'class', IFNULL(Guilds.name, 'None') AS 'guild' FROM Characters
                                            INNER JOIN Accounts ON Characters.accountID = Accounts.accountID
                                            LEFT JOIN Classes ON Characters.classID = Classes.classID
                                            LEFT JOIN Guilds ON Characters.guildID = Guilds.guildID
                                            WHERE characterID = ${characterID};`;
            db.query(selectCharacterQuery, (err, result) => {
                if (err) {
                    console.error('Error updating character:', error);
                    res.status(500).send('Internal Server Error');
                }
                else {
                    res.send(result);
                }
            });
        }
    });
});

// DELETE character
router.delete('/delete', (req, res) => {
    const { characterID } = req.body;
    const deleteCharacterQuery = `DELETE FROM Characters WHERE characterID = ${characterID};`;
    db.query(deleteCharacterQuery, (err, results) => {
        if (err) {
            console.error('Error deleting character:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.sendStatus(204);
        }
    });

    //res.redirect('/characters');
});

module.exports = router;