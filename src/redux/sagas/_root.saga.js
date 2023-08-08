import { all } from 'redux-saga/effects';
// import the sagas
import userSaga from './user.saga';
import favsSaga from './favs.saga';
import searchSaga from './search.saga';


export default function* rootSaga() {
    yield all([
        // bring in sagas here
        userSaga(),
        favsSaga(),
        searchSaga(),
    ]);
};

