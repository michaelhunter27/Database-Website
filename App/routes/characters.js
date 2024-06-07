/* 
  Michael Hunter and Ryan Giard
  CS 340 group 91
  characters.js
*/
/*
  Code citation:
    Code for these routes is adapted from the examples in the nodejs starter app.
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Routes for characters page

const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

// Display all characters
router.get('/', (req, res) => {
    // get data for character table
    const charactersQuery = 
            `SELECT characterID, Characters.accountID AS 'accountID', Accounts.username AS 'username', 
                Characters.name AS 'name', level, IFNULL(Characters.classID, 'NULL') AS 'classID', IFNULL(Classes.name, 'None') AS 'class', 
                IFNULL(Characters.guildID, 'NULL') AS 'guildID', IFNULL(Guilds.name, 'None') AS 'guild' FROM Characters
            INNER JOIN Accounts ON Characters.accountID = Accounts.accountID
            LEFT JOIN Classes ON Characters.classID = Classes.classID
            LEFT JOIN Guilds ON Characters.guildID = Guilds.guildID;`;

    db.query(charactersQuery, (err, results) => {
        if (err) {
            console.error('Error fetching characters:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const characters = results; // save result of previous query
            // get data for Accounts dropdown menu
            const accountsQuery = "SELECT * FROM Accounts;";

            db.query(accountsQuery, (err, results) => {
                if (err) {
                    console.error('Error fetching accounts:', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    const accounts = results; // save result of previous query
                    // get data for Classes dropdown menu
                    const classesQuery = "SELECT * FROM Classes;";

                    db.query(classesQuery, (err, results) => {
                        if (err) {
                            console.error('Error fetching classes:', err);
                            res.status(500).send('Internal Server Error');
                        } else {
                            const classes = results; // save result of previous query
                            // get data for Guilds dropdown menu
                            const guildsQuery = "SELECT * FROM Guilds;";

                            db.query(guildsQuery, (err, results) => {
                                if (err) {
                                    console.error('Error fetching guilds:', err);
                                    res.status(500).send('Internal Server Error');
                                } else {
                                    const guilds = results; // save result of previous query
                                    // get data for Hats checkboxes
                                    const hatsQuery = "SELECT * FROM Hats;";

                                    db.query(hatsQuery, (err, results) => {
                                        if (err) {
                                            console.error('Error fetching hats:', err);
                                            res.status(500).send('Internal Server Error');
                                        } else {
                                            const hats = results; // save result of previous query
                                            // get intersection table data
                                            const intersectionQuery = 
                                                    `SELECT character_hatID, Characters_Hats.characterID AS 'characterID', Characters.name AS 'character', 
                                                        Characters_Hats.hatID AS 'hatID', Hats.name  AS 'hat' FROM Characters_Hats
                                                    INNER JOIN Characters ON Characters.characterID = Characters_Hats.characterID
                                                    INNER JOIN Hats ON Hats.hatID = Characters_Hats.hatID
                                                    ORDER BY characterID;`;

                                            db.query(intersectionQuery, (err, results) => {
                                                if (err) {
                                                    console.error('Error fetching intersection table:', err);
                                                    res.status(500).send('Internal Server Error');
                                                } else {
                                                    res.render('characters', { 
                                                        characters: characters, 
                                                        accounts: accounts, 
                                                        classes: classes,
                                                        guilds: guilds,
                                                        hats: hats,
                                                        intersection: results});
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
        }
    });
});

// CREATE a new character
router.post('/add', (req, res) => {
    const { accountID, name, level, classID, guildID, hatIDs} = req.body;
    const addCharacterQuery = `INSERT INTO Characters (accountID, name, level, classID, guildID) VALUES
                                (${accountID}, '${name}', ${level}, ${classID}, ${guildID});`
    db.query(addCharacterQuery, (err, results) => {
        if (err) {
            console.error('Error inserting character:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const characterID = results.insertId;
            let addHatsQuery = "SELECT * FROM Characters_Hats";
            if (typeof hatIDs !== 'undefined'){
                addHatsQuery = `INSERT INTO Characters_Hats (characterID, hatID) VALUES `;
                for (let i = 0; i < hatIDs.length; i++){
                    addHatsQuery += `(${characterID}, ${hatIDs[i]})`;
                    if (i < hatIDs.length - 1){
                        addHatsQuery += ', ';
                    }
                    else{
                        addHatsQuery += ';';
                    }
                }
            }

            db.query(addHatsQuery, (err, results) => {
                if (err) {
                    console.error('Error inserting character (inserting hats):', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.redirect('/characters');
                }
            });
        }
    });
});

// UPDATE character
router.put('/update', (req, res) => {
    const { characterID, accountID, name, level, classID, guildID, hatIDs} = req.body;
    
    const updateCharacterQuery = `UPDATE Characters SET accountID = ${accountID}, name = '${name}', level = ${level}, classID = ${classID}, guildID = ${guildID} WHERE characterID = ${characterID}`
    
    db.query(updateCharacterQuery, (err, result) => {
        if (err) {
            console.error('Error updating character:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const deleteHatsQuery = `DELETE FROM Characters_Hats WHERE characterID = ${characterID};`
    
            db.query(deleteHatsQuery, (err, result) => {
                if (err) {
                    console.error('Error updating character (deleting hats):', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    // query to execute if there are no hats to add
                    let addHatsQuery = "SELECT * FROM Characters_Hats";

                    // build a query to insert into intersection table
                    if (typeof hatIDs !== 'undefined'){
                        addHatsQuery = `INSERT INTO Characters_Hats (characterID, hatID) VALUES `;
                        for (let i = 0; i < hatIDs.length; i++){
                            addHatsQuery += `(${characterID}, ${hatIDs[i]})`;
                            if (i < hatIDs.length - 1){
                                addHatsQuery += ', ';
                            }
                            else{
                                addHatsQuery += ';';
                            }
                        }
                    }

                    db.query(addHatsQuery, (err, result) => {
                        if (err) {
                            console.error('Error updating character (adding hats):', err);
                            res.status(500).send('Internal Server Error');
                        } else {
            
                            const selectCharacterQuery = `SELECT characterID, Accounts.username AS 'username', Characters.name AS 'name', level, IFNULL(Classes.name, 'None') AS 'class', IFNULL(Guilds.name, 'None') AS 'guild' FROM Characters
                                                            INNER JOIN Accounts ON Characters.accountID = Accounts.accountID
                                                            LEFT JOIN Classes ON Characters.classID = Classes.classID
                                                            LEFT JOIN Guilds ON Characters.guildID = Guilds.guildID
                                                            WHERE characterID = ${characterID};`;
                            db.query(selectCharacterQuery, (err, result) => {
                                if (err) {
                                    console.error('Error updating character (getting character data):', err);
                                    res.status(500).send('Internal Server Error');
                                }
                                else {
                                    const characterData = result; //save result to send in response

                                    const getHatsQuery = `SELECT character_hatID, Characters.characterID AS 'characterID', Characters.name AS 'characterName', Hats.hatID AS 'hatID', Hats.name AS 'hatName' FROM Characters_Hats
                                                            INNER JOIN Characters ON Characters_Hats.characterID = Characters.characterID
                                                            INNER JOIN Hats ON Characters_Hats.hatID = Hats.hatID
                                                            WHERE Characters_Hats.characterID = ${characterID};`
                                    db.query(getHatsQuery, (err, result) => {
                                        if (err) {
                                            console.error('Error updating character (getting hats):', err);
                                            res.status(500).send('Internal Server Error');
                                        } else {
                                            const hatsData = result;  // save results to send in response
                                            res.send({characterData:characterData, hatsData:hatsData});
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

// DELETE character
router.delete('/delete', (req, res) => {
    const { characterID } = req.body;
    const deleteCharacterQuery = `DELETE FROM Characters WHERE characterID = ${characterID};`;
    db.query(deleteCharacterQuery, (err, results) => {
        if (err) {
            console.error('Error deleting character:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(204).send(results); 
        }
    });
});

module.exports = router;