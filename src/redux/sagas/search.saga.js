import axios from "axios";
import { takeLatest, takeEvery, put } from "redux-saga/effects";

export default function* searchSaga() {
    // add search saga generator functions in here
    yield takeEvery('FETCH_SEARCH_RESULTS', fetchSearchResults);
};

function* fetchSearchResults(action) {
    try {
        // grab response from the get request to the giphy api
        const response = axios.get(`/search/${action.payload}`);
        yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data}); // update the reducer with the response data
    } catch (err) {
        console.log('there was an getting getting the search resutls ', err)
    }
}