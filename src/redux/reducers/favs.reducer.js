const favsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAVS_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default favsReducer;