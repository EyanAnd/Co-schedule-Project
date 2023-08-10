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
    const queryText = `SELECT * FROM "favs" WHERE "user_id" = $1 ORDER BY "rating" DESC;`;
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

// update rating for the fav
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

// post to add a gif through a 'plus icon'
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

// route for filters
router.get('/filter/:rating', rejectUnauthenticated, (req, res) => {
    // grab user id
    const user_id = req.user.id;

    // grab rating number
    let rating = Number(req.params.rating);
    // create query text
    let queryText;
    // conditional for query text
    if(rating === 0) {
        queryText = `SELECT * FROM favs
        WHERE user_id = $1
        AND COALESCE(rating, 0) = $2;`;
    } else if(rating > 0) {
        queryText = `SELECT * FROM "favs" WHERE user_id = $1 AND "rating" = $2`
    }
    // send to database
    pool.query(queryText, [user_id, rating])
    .then(result => {
        console.log(`getting results with ${rating} `, result);
        res.send(result.rows);
    }).catch(err => {
        console.log('there was an error getting the filter rating ', err)
    })
})

module.exports = router;