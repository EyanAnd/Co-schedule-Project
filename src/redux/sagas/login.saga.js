import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";



function* loginSaga() {
    // put login and logout functions here
    yield takeLatest('LOGIN', login);
    yield takeLatest('LOGOUT', logout);
};

function* login(action) {
    try {
       console.log(action)
        // clear login error
        yield put({ type: 'CLEAR_LOGIN_ERROR' });
        // create config for credentials to allow the session to recognize the user
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        // make post to login
        const response = yield axios.post('/user/login', action.payload.user, config);
        console.log(response.data) // check the data
        yield put({ type: 'FETCH_USER', payload: response.data }); // update the user reducer
    } catch (error) {
        // TODO: make more specific errors. 
        console.log('there was an error logging in a user ', error) // log the error
        // if (error.response.status === 401) {
        //     yield put({ type: 'LOGIN_FAILED' });
        // } else {
        //     yield put({ type: 'LOGIN_FAILED_NO_CODE' });
        // }
    }
};

function* logout() {
    try {
        // create config to allow the session to recognize the user who is logging out
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // post witht the config to log the user out
        yield axios.post('/user/logout', config);

        yield put({ type: 'UNSET_USER' }); // update the user reducer by unsetting the current user
    } catch (err) {
        console.log('there was an error logging out a user ', err) // log the error
    }
};

export default loginSaga;