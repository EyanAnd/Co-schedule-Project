const searchReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULT': // set the search 
            return action.payload // return the search result 
        default:
            return state;
    }
}

export default searchReducer;