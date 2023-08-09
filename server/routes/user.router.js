const express = require('express');
const {
    rejectUnauthenticated, 
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

// handles request for user info if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
    res.send(req.user);
});

// handles POST request with new user data
router.post('/register', (req, res, next) => {
    const username = req.body.username;
    const password= encryptLib.encryptPassword(req.body.password);

    const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
    pool
    .query(queryText, [username, password])
    .then(() => {
        res.sendStatus(201);
    }).catch((e) => {
        console.log('there was an error registering a new user ', e);
        res.sendStatus(500);
    }) 
});
// use user strategy here, this will run the post if successful, if not it will give a 404.
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
    console.log('is this even coming in')
    res.sendStatus(200); // tell the user ok if they have logged in!
});

// clear all server session info for user and log them out
router.post('/logout', (req, res) => {
    // use passport js built in feature to logout user here
    req.logout();
    res.sendStatus(200);
});

module.exports = router;
