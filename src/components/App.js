import { Flex } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import components
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import FavoritesPage from './FavoritesPage/FavoritesPage';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';

function App() {

  // init use dispatch
  const dispatch = useDispatch();
  // grab user from the store
  const user = useSelector((store) => store.user);

  // use effect to watch when the user changes
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      {/* show this information regardless of if the user is logged in or not */}
      <Flex>
        <Nav />
      </Flex>
      <Switch>
        <Route exact path='/register'>
          <RegisterPage />
        </Route>
        {/* protected route for a users favorites list */}
        <ProtectedRoute exact path='/favorites'>
          <FavoritesPage />
        </ProtectedRoute>
        <Route exact path='/home'>
          <HomePage />
        </Route>
        {/* is the user logged in? if so, redirect them to the home page */}
        {user.id ?
          <Redirect to='/home' />
          :
          // if they are not logged in, bring them to the login page
          <LoginPage />}
        <Route exact path='/login'>
          <LoginPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
