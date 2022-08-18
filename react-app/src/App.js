import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Sidebar from './components/Home/Sidebar';
import NotebookView from './components/MainPageView/NotebookView';
import Trash from './components/Trash/Trash';
import Home from './components/Home/Home';
import Splash from './components/Splash/Splash';

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
      <Route path='/sign-up' exact={true}>
        <SignUpForm />
      </Route>
      <Route path='/' exact={true} >
        <Splash />
      </Route>
      <Route path='/login' exact={true}>
        <LoginForm />
      </Route>
        <ProtectedRoute path='/home' exact={true} >
          <Sidebar />
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/trash' exact={true} >
          <Sidebar />
          <Trash />
        </ProtectedRoute>
        <ProtectedRoute path='/:notebookId' exact={true} >
          <Sidebar />
          <NotebookView />
        </ProtectedRoute>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
