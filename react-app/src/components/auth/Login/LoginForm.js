import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../../store/session';

import bg from './jungle-bg.jpeg';
import evernote_logo from './evernote_logo.png';
import './Login.css';



const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="form-wrapper">
      <form className="form login" onSubmit={onLogin}>
      <div className="form-logo">
                    <img src={evernote_logo} id="logo" alt="Evernote logo" />
                    <span id="logo-text">Note Pile</span>
      </div>
        <div className="form-dongles">
            {/* <label htmlFor='email'>Email</label> */}
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
            {/* <label htmlFor='password'>Password</label> */}
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button type='submit' className="green-button login-signup">Login</button>
        </div>
        <div className="form-errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="dont-have-account">
          <p>Don't have an account?</p>
          <Link to="/sign-up">Create account</Link>
        </div>
        <img src={bg} className="bg" alt="bg"/>
      </form>
    </div>
  );
};

export default LoginForm;
