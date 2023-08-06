const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();
const app = express();

// modules for routes

const sessionMiddleware = require('./modules/session-middleware'); // bring in modules session middleware
const passport = require(); // bring in user strategy here
// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// passport session config
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());


// routes

app.use(express.static('build'));

// set port
const PORT = process.env.PORT || 5000;

// listen on the port
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

module.exports = app;