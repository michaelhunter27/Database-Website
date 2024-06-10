/* 
  Michael Hunter and Ryan Giard
  CS 340 group 91
  App.js
*/

/*
  Code citation:
  The SETUP and LISTENER portion of this code is from the nodejs starter app: 
  https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

/*
    SETUP
*/
PORT = 31415; // Set a port number at the top so it's easy to change in the future

// Express
const express = require('express'); // We are using the express library for the web server
const app = express(); // We need to instantiate an express object to interact with the server in our code

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public')); // this is needed to allow for the form to use the css style sheet


// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars'); // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" })); // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
const db = require('./database/db-connector')

/*
    ROUTES
*/
const classRoutes = require('./routes/classes');
app.use('/classes', classRoutes);

const characterRoutes = require('./routes/characters');
app.use('/characters', characterRoutes);

const guildRoutes = require('./routes/guilds');
app.use('/guilds', guildRoutes);

const hatRoutes = require('./routes/hats');
app.use('/hats', hatRoutes);

const accountRoutes = require('./routes/accounts');
app.use('/accounts', accountRoutes);

app.get('/', function (req, res) {
    res.render('index');
});


/*
    LISTENER
*/
app.listen(PORT, function () { // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
