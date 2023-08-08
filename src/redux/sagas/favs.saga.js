import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";

function* favsSaga() {
    // put all generator functions for favorites saga here
    yield takeLatest('FETCH_USER_FAV', fetchUserFav);
    yield takeLatest('ADD_NEW_FAV', addNewFav);
    yield takeLatest('UPDATE_COMMENT_ON_FAV', updateCommentOnFav);
    yield takeLatest('UPDATE_RATING_ON_FAV', updateRatingOnFav);
    yield takeLatest('DELETE_FROM_FAV', deleteFromFav);
};

// getting the favorites
function* fetchUserFav() {
    
};

// saga for posting a new favorite
function* addNewFav() {

};

// updating the favorite comment
function* updateCommentOnFav() {

};
// updating the rating
function* updateRatingOnFav() {

};
// deleting a favorite from the list
function* deleteFromFav() {

};


export default favsSaga;

