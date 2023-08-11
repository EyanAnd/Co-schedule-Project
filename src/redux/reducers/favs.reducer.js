const favsReducer = (state = [], action) => {
    switch (action.type) {
        // set the list for the favorites for a particular user
        case 'SET_FAVS_LIST':
            return action.payload; // return the list 
        case 'SET_FILTER_GIFS': // set the fileterd list of a particular rating
            return action.payload // return the rating list
        default:
            return state;
    }
}

export default favsReducer;