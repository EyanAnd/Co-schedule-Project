import { put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* registrationSaga() {
    // yields in here
    yield takeLatest('REGISTER', registerUser);
}

function* registerUser(action) {
    try {
        // clear any errors 
        yield put({ type: 'CLEAR_REGISTRATION_ERROR '});

        // pass in username and password
        yield axios.post('/user/register', {username: action.payload.user.username, password: action.payload.user.password});

        // automatically log in the user
        console.log(action.payload)
        yield put({ type: 'LOGIN',  payload: action.payload });

        yield put({ type: 'SET_TO_LOGIN_MODE' });
    } catch (err) {
        console.log('there was an error registering the user ', err);
        yield put({ type: 'REGISTRATION_FAILED '})
    }
}

export default registrationSaga;