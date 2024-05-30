/*
    Code citation:
    This code is from the nodejs starter app: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get an instance of mysql we can use in the app
const mysql = require('mysql');

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_giardr',
    password        : '4754',
    database        : 'cs340_giardr'
});

// Export it for use in our applicaiton
module.exports = pool;