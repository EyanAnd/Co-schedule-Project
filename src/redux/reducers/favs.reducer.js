const favsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAVS_LIST':
            return action.payload;
        case 'SET_FILTER_GIFS':
            return action.payload
        default:
            return state;
    }
}

export default favsReducer;