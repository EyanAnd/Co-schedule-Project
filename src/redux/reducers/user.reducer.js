const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER': // login the user
            return action.payload; // return the current user
        case 'UNSET_USER': // unset or logout the current user
            return {}; // return an empty object
        default:
            return state;
    }
}

export default userReducer;