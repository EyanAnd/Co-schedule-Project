import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* userSaga() {
    // put other generator functions in here for the user saga
    yield takeLatest('FETCH_USER', fetchUser);
};

function* fetchUser() {

    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true, // credentials allow the user to be recognized by the session
            // so when logged in it will returnt their information
        }
        const response = yield axios.get('/user/', config);
        console.log(response.data); // check the data
        yield put({ type: 'SET_USER', payload: response.data}); // update the reducer with the logged in user information
    } catch (err) {
        console.log('there was an error fetching the user ', err)
    }

}

export default userSaga;