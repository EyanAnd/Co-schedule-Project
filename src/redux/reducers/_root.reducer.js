import { combineReducers } from "redux";
// import other reducers
import userReducer from "./user.reducer";
import favsReducer from "./favs.reducer";
import searchReducer from "./search.reducer";
import errorsReducer from "./errors.reducer";

const rootReducer = combineReducers({
    // reducers here
    user: userReducer, // holds user data
    favorites: favsReducer, // holds user favorites list data
    search: searchReducer, // holds search results data
    errorsReducer, // errors reducer to hold errors for loggin in and loggin out
});

export default rootReducer;