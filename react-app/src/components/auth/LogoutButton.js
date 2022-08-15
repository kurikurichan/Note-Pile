import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';

import { useHistory } from 'react-router-dom';


const LogoutButton = () => {

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout());
    return history.push('/');
  };

  return <button id="logout" onClick={onLogout}>Sign out {user.username}</button>;
};

export default LogoutButton;
