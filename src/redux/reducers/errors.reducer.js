// this will hold all of the errors for logging in or logging out a user
import { combineReducers } from "redux";

// login message reducer
const loginMessage = (state = '', action) => {
    switch (action.type) {
        case 'CLEAR_LOGIN_ERROR':
            return '';
        case 'LOGIN_INPUT_ERROR':
            return 'Enter a username and a password';
        case 'LOGIN_FAILED':
            return 'The username and password did not match';
        case 'LOGIN_FAILED_NO_CODE':
            return 'The login failed with no code'; 
        default:
            return state;
    }
};

// register message reducer
const registerMessage = (state = '', action) => {
    switch (action.type) {
        case 'CLEAR_REGISTRATION_ERROR':
            return '';
        case 'REGISTRATION_INPUT_ERROR':
            return 'Create a username and a password';
        case 'REGISTRATION_FAILED':
            return 'username may be taken, try again';
        default:
            return state;
    }
};

// create one object out of these two reducers to bring into the root
export default combineReducers({
    loginMessage,
    registerMessage,
});