import { Route, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import { useSelector } from 'react-redux';


function ProtectedRoute({ component, children, ...props }) {
    const user = useSelector((store) => store.User); // grab the user from the reducer store

    const ProtectedComponent = component || (() => children); // protected component could be passed in or as a child prop

    return (
        <Route { ...props}>
            {/* is the user logged in? if so show the protected component, if not show the login page */}
            {user.id ? 
            <ProtectedComponent />
            :
            <LoginPage />}
        </Route>
    )

}