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
        userSaga(),
        favsSaga(),
        searchSaga(),
        loginSaga(),
        registrationSaga(),
    ]);
};

