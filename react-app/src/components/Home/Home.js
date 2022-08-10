import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import './Home.css';

import coffee from './coffee.jpeg';

export default function Home() {

  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();

    //  get and format long date
    const getToday = () => {
      const today = new Date();
      const weekdays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
      return weekdays[today.getDay()] + ", " +
      today.toLocaleDateString('en-CA', {
          dateStyle: "long"
      });
  };

  return (
    <div className="home-container">
      <div className="scrollable">
          <div className="above-home">

            <div className="underlying-photo">
                <img src={coffee} id="coffee" alt="blurred cup in background" />
              </div>

            <div className="above-home-text">
              <h3>Welcome, {user.username}!</h3>
              <p id="today">{getToday()}</p>
            </div>



          </div>

          <div style={{ padding: '15%'}}></div>
          <div className="contain-widgets">

              <div className="notes-preview">
                <div className="notes-preview-top">
                  <p>NOTES<i className="fa-solid fa-angle-right"></i></p>
                </div>
                <div className="notes-preview-display">

                </div>
              </div>

              <div className="scratch">
              </div>
          </div>
        </div>
    </div>
  )
}
