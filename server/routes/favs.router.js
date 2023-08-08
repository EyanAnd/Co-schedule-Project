const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// gotta GET to reach the users favs list where the
//  user_id in favs table matches the user id
router.get('/',rejectUnauthenticated, (req, res) => {
    // grab user
    const user_id = req.user.id;
    // create query text
    const queryText = `SELECT * FROM "favs" WHERE "user_id" = $1;`;
    pool.query(queryText, [user_id]).then(result => {
        res.send(result.rows); // send the gifs for the particular user
    }).catch(err => {
        console.log('there was an error getting the gifs for the user ', err);
        res.sendStatus(500);
    });
});

// update comments for the fav
router.put('/', rejectUnauthenticated, (req, res) => {
    // grab user
    const user_id = req.user.id;
    // grab comments from the body
    const comments = req.body.comments
    // grab fav id
    const gif_id = req.body.id
    // queryText
    const queryText = `UPDATE "favs" SET "comments" = $1 WHERE "id" = $2 AND "user_id" = $3;`;
    pool.query(queryText, [comments, gif_id, user_id]).then(result => {
        console.log(result) // check the new update
        res.sendStatus(200); // send an ok
    }).catch(err => {
        console.log('there was an error updating the comments ', err);
    });
});

// update comments for the fav
router.put('/rate', rejectUnauthenticated, (req, res) => {
    // grab user
    const user_id = req.user.id;
    // grab new rating from the body
    const newRating = req.body.rating
    // grab fav id
    const gif_id = req.body.id
    // queryText
    const queryText = `UPDATE "favs" SET "rating" = $1 WHERE "id" = $2 AND "user_id" = $3;`;
    pool.query(queryText, [newRating, gif_id, user_id]).then(result => {
        console.log(result) // check the new update
        res.sendStatus(200); // send an ok
    }).catch(err => {
        console.log('there was an error updating the comments ', err);
    });
});
// delete to take a url off of the users list.
router.delete('/', rejectUnauthenticated, (req, res) => {
    const fav_id = req.body.id; // grab user
    const user_id = req.user.id;
    const queryText = `DELETE FROM "favs" WHERE "id" = $1 AND "user_id" = $2;`;
    pool.query(queryText, [fav_id, user_id]).then(result => {
        console.log('deleted this gif ', result);
        res.sendStatus(204); // show no content
    }).catch(err => {
        console.log('there was an error deleting the gif ', err)
    });
});

// post to add a gif through a 'like'
router.post('/',rejectUnauthenticated, (req, res) => {
    // grab user id
    const user_id = req.user.id
    // queryText
    const queryText = `INSERT INTO "favs" (user_id, url, comments, rating) VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [user_id, req.body.url, req.body.comments, req.body.rating])
    .then(result => {
        console.log('added a gif ', result);
        res.sendStatus(201);
    }).catch(err => {
        console.log('there was an error creating a new fav gif ', err);
    });
});

module.exports = router;