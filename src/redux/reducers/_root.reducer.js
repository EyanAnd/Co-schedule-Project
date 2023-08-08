import { combineReducers } from "redux";
// import other reducers
import userReducer from "./user.reducer";
import favsReducer from "./favs.reducer";
import searchReducer from "./search.reducer";

const rootReducer = combineReducers({
    // reducers here
    User: userReducer, // holds user data
    Favorites: favsReducer, // holds user favorites list data
    Search: searchReducer, // holds search results data
});

export default rootReducer;