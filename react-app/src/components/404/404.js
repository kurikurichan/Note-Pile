import React from 'react';
import { Link  } from 'react-router-dom';
import './404.css';

export default function NotFound() {
  return (
    <div className="out-container not-found">
        <h1>There are no notebooks to be found here!</h1>
        <h3>Follow the page below back to home</h3>
        <Link to="/home"><i id="big-note" className="fa-solid fa-book-open"></i></Link>
    </div>
  )
}
