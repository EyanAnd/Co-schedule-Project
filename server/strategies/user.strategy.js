const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    pool.query('SELECT * FROM "user" WHERE "id" = $1', [id])
    .then((result) => {
        const user = result && result.rows && result.rows[0];

        if(user) {
            // user found
            delete user.password; // remove password so it doesn't actually get sent
            // done takes error which is null and the user
            done(null, user);
        } else {
            // user not found
            done(null, null);
        }
    }).catch((e) => {
        console.log('error with query when deserializing a user ', e); // log error
        done(e, null); // done takes the error and the user which is null which
        // will return a 500 status code
    });
});

// loggin in a user
passport.use(
    'local',
    new LocalStrategy((username, password, done) => {
        pool.query('SELECT * FROM "user" WHERE "username" = $1', [username])
        .then((result) => {
            const user = result && result.rows && result.rows[0];
            if(user && encryptLib.comparePassword(password, user.password)) {
                // passwords match! done will take error(which is null) and the user
                done(null, user);
            } else {
                // username and password do not match.
                // will result in a 401 status code
                done(null, null);
            }
        })
        .catch((e) => {
            console.log('error with query for the user ', e); // log the error
            done(e, null); // done will take the error and the user which is null and 
            // will result in the server giving a 500 status code
        });
    })
);

module.exports = passport;