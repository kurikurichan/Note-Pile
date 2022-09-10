import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Sidebar from './components/Sidebar/Sidebar';
import NotebookView from './components/MainPageView/NotebookView';
import Trash from './components/Trash/Trash';
import Home from './components/Home/Home';
import Splash from './components/Splash/Splash';
import NotFound from './components/404/404';

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
    return <div className="loader" style={{backgroundColor:"var(--background-primary)"}}></div>;
  }

  return (
    <BrowserRouter>
      <Switch>
      <Route path='/sign-up'>
        <SignUpForm />
      </Route>
      <Route path='/' exact={true} >
        <Splash />
      </Route>
      <Route path='/login'>
        <LoginForm />
      </Route>
        <ProtectedRoute path='/home'>
          <Sidebar />
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/trash' >
          <Sidebar />
          <Trash />
        </ProtectedRoute>
        <ProtectedRoute path='/:notebookId' exact={true} >
          <Sidebar />
          <NotebookView />
        </ProtectedRoute>
        <Route path='*'>
          <Sidebar />
          <NotFound />
        </Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
