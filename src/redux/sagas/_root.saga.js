import { all } from 'redux-saga/effects';
// import the sagas
import userSaga from './user.saga';
import favsSaga from './favs.saga';
import searchSaga from './search.saga';
import loginSaga from './login.saga';
import registrationSaga from './register.saga';


export default function* rootSaga() {
    yield all([
        // bring in sagas here
        userSaga(), // holds all functions for users
        favsSaga(), // holds all functions for favorites list
        searchSaga(), // holds all functions for search results
        loginSaga(), // holds all functions for loggins in a user and logging out a user
        registrationSaga(), // holds all functions for registering a user
    ]);
};

