const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const sessionMiddleware = require('./modules/session-middleware'); // bring in modules session middleware
const passport = require('./strategies/user.strategy'); // bring in user strategy here

// modules for routes
const userRouter = require('./routes/user.router');


// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// passport session config
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());


// routes
app.use('/user', userRouter); // run user rotuer base with the user router requests

app.use(express.static('build'));

// set port
const PORT = process.env.PORT || 5000;

// listen on the port
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

module.exports = app;