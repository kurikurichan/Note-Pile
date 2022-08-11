import React from 'react';
import bg from './jungle-bg.jpeg';

import './Login.css';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div>
        <LoginForm />
        <img src={bg} className="bg" alt="bg"/>
    </div>
  )
}
