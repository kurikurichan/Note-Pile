import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';

import bg from './jungle-bg.jpeg';
import evernote_logo from './evernote_logo.png';
import './Login.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Error: Passwords must match"]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className="form-wrapper">
      <form className="form login" onSubmit={onSignUp}>
        <div className="form-logo">
          <img src={evernote_logo} id="logo" alt="Evernote logo" />
          <span id="logo-text">Note Pile</span>
          <p>Remember everything important.</p>
        </div>
        <div className="signup-dongles">
          <div>
            <label className="label">User Name</label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder="User Name"
            ></input>
          </div>
          <div>
            <label className="label">Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder="Email"
            ></input>
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder="Password"
            ></input>
          </div>
          <div>
            <label className="label">Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder="Repeat Password"
            ></input>
          </div>
          <button type='submit' className="green-button signup-but">Sign Up</button>
        </div>
        <div className="form-errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className="dont-have-account">
          <p>Already have an account?</p>
          <Link to="/login">Sign in</Link>
        </div>
      </form>
      <img src={bg} className="bg" alt="bg"/>
    </div>
  );
};

export default SignUpForm;
