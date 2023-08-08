const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const axios = require('axios');

// bring in the api key
const API_KEY = process.env.GIPHY_API_KEY;

// a get request to the giphy api to search for our browser
router.get('/:search', async (req, res) => {
    const search_params = req.params.search;
    try {
        // grab response from the get request to giphy api
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search_params}&limit=20`);
        console.log(response.data); // test the data to make sure that it comes in correctly
        res.send(response.data.data) // send the response data for the get request
    } catch (err) {
        console.log('there was an error searching ', err);
        res.sendStatus(500);
    }
})


module.exports = router;