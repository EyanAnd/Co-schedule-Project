import favsReducer from "./favs.reducer"; // import reducer we are testing

// descirbe the test that is being implemented
describe('testing the favorites list reducer', () => {
    // testing default returned state
    test('should show an empty array for the returned state', () => {
        let action = {};
        let returnedState= favsReducer(undefined, action); // create returned state with empty action
        expect(returnedState).toEqual([]); // expect an empty array
    });

    test('should set the list for the favorites', () => {
        let action = { type: 'SET_FAVS_LIST' };
        let returnedState = favsReducer(undefined, action);
        expect(returnedState).toEqual(action.payload); // expect the action.payload which will be the list
    });

    test('should return filtered set of lists', () => {
        let action = { type: 'SET_FILTER_GIFS' };
        let returnedState = favsReducer(undefined, action);
        expect(returnedState).toEqual(action.payload); // expect the new filtered list of results
    })
})