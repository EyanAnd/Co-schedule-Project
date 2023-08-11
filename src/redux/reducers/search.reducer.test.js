import searchReducer from "./search.reducer"; // import the search reducer we are testing

// describe an empty test
describe("testing the search reduer", () => {
    // test the default return state
    test('should show no search results or in our case an empty array ', () => {
        let action = {};
        let returnedState = searchReducer(undefined, action);
        expect(returnedState).toEqual([]); // we expect it to equal an empty array
    });
    // test the set here
    test('should return an array with the search results ', () => {
        let action = { type: 'SET_SEARCH_RESULT' };
        let returnedState = searchReducer(undefined, action);
        expect(returnedState).toEqual(action.payload);
    });
});