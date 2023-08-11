import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* searchSaga() {
    // add search saga generator functions in here
    yield takeLatest('FETCH_SEARCH_RESULTS', fetchSearchResults);
};

// function to fetch search results
function* fetchSearchResults(action) {
    try {
        console.log(action.payload)
        // grab response from the get request to the giphy api
        const response = yield axios.get(`/user/search/${action.payload}`);
        console.log(response.data)
        yield put({ type: 'SET_SEARCH_RESULT', payload: response.data}); // update the reducer with the response data
    } catch (err) {
        console.log('there was an getting getting the search resutls ', err)
    }
};

export default searchSaga;