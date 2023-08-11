import userReducer from "./user.reducer"; // import reducer we are testing

// describe the test that is being implemented
describe('testing the user reducer', () => {
    // testing the default returned state
    test('should show an empty object for the returned state', () => {
        let action = {};
        let returnedState= userReducer(undefined, action); // create returned state with empty action
        expect(returnedState).toEqual({}); // expect an empty object 
    });

    test('should bring back the action. payload for a user here', () => {
        let action = { type: 'SET_USER' };
        let returnedState = userReducer(undefined, action);
        expect(returnedState).toEqual(action.payload); // expect result to be action.payload
    });

    test('should recieve an empty object since we logout or unset a user', () => {
        let action = { type: 'UNSET_USER' }; // type of unsetting a user or logging them out
        let returnedState = userReducer(undefined, action);
        expect(returnedState).toEqual({}); // reset back to an empty object
    });
})