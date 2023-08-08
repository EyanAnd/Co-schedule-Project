const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// gotta GET to reach the users favs list where the
//  user_id in favs table matches the user id
router.get('/',rejectUnauthenticated, (req, res) => {
    // create query text
})

// update the list via taking a list on and off of the list
router.put('/', rejectUnauthenticated, (req, res) => {

})
// delete to take a url off of the users list.
router.delete('/', rejectUnauthenticated, (req, res) => {

})


// make a post to post the the database via a "like" to add a gif to the 
// users list
router.post('/',rejectUnauthenticated, (req, res) => {

})


module.exports = router;