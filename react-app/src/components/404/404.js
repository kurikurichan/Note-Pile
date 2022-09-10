import React from 'react';
import './404.css';

export default function NotFound() {
  return (
    <div className="out-container not-found">
        <h1>There are no notebooks to be found here!</h1>
        <i id="big-note" className="fa-solid fa-book-open"></i>
    </div>
  )
}
