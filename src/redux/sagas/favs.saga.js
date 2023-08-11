import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* favsSaga() {
    // put all generator functions for favorites saga here
    yield takeLatest('FETCH_USER_FAV', fetchUserFav);
    yield takeLatest('ADD_NEW_FAV', addNewFav);
    yield takeLatest('UPDATE_COMMENT_ON_FAV', updateCommentOnFav);
    yield takeLatest('UPDATE_RATING_ON_FAV', updateRatingOnFav);
    yield takeLatest('DELETE_FROM_FAV', deleteFromFav);
    yield takeLatest('FILTER_GIFS', filterFavs);
};

// getting the favorites
function* fetchUserFav(action) {
    try {
        // grab the response from the get to grab users list
        const response = yield axios.get(`/user/favs/`, action.payload);
        console.log(response.data); // check the response
        yield put({ type: 'SET_FAVS_LIST', payload: response.data});
    } catch (err) {
        console.log('there was an error fetching the user favs ', err);
    }
};

// saga for posting a new favorite
function* addNewFav(action) {
    try {
        // grab the response for adding a new fav
        const response = yield axios.post(`/user/favs/`, action.payload);
        console.log(response.data) // check the data
        yield put({ type: 'FETCH_USER_FAV', payload: response.data}); // set the list witht the new fav gif
    } catch (err) {
        console.log('there was an error adding a new fav to the list ', err);
    }
};

// updating the favorite comment
function* updateCommentOnFav(action) {
    try {
        // grab response from put to update the comments for a favorite gif
        const response = yield axios.put(`/user/favs/`, {comments: action.payload.comments, id: action.payload.id });
        console.log(response.data); // check the data
        yield put({ type: 'FETCH_USER_FAV', payload: response.data}) // update the list
    } catch (err) {
        console.log('there was an erro updating the comment on a fav ', err);
    }
};
// updating the rating
function* updateRatingOnFav(action) {
    try {
        // grab the response for the router call
        const response = yield axios.put(`/user/favs/rate`, {rating: action.payload.rating, id: action.payload.id });
        console.log(response.data); // check the data
        yield put({ type: 'FETCH_USER_FAV', payload: response.data }); // update the users list
    } catch (err) {
        console.log('there was an error updating the rating on a fav ', err);
    }
};
// deleting a favorite from the list
function* deleteFromFav(action) {
    try {
        console.log(action)
        // grab the response from the router call
        const response = yield axios.delete(`/user/favs/`, {data: {id: action.payload.id }});
        console.log(response.data); // check the data
        yield put({ type: 'FETCH_USER_FAV' }); // update the users list
    } catch (err) {
        console.log('there was an error deleting a gif from the favs list ', err);
    }
};

function* filterFavs(action) {
    try {
        // grab response
        const response = yield axios.get(`/user/favs/filter/${action.payload}`);
        console.log(response.data); // check the data
        yield put({ type: 'SET_FILTER_GIFS', payload: response.data})
    } catch (err) {
        console.log('there was an error in the filter favs saga ', err)
    }
}

export default favsSaga;

