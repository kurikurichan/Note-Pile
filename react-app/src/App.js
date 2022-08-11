import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Sidebar from './components/Home/Sidebar';
import NotebookView from './components/MainPageView/NotebookView';
import Trash from './components/Trash/Trash';
import Home from './components/Home/Home';
import Splash from './components/Splash/Splash';
import LoginPage from './components/auth/Login/LoginPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} >
          <Splash />
        </Route>
        <Sidebar />
      </Switch>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} >
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/trash' exact={true} >
          <Trash />
        </ProtectedRoute>
        <ProtectedRoute path='/:notebookId' exact={true} >
          <NotebookView />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
