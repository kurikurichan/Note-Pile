import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getEverySinglePage } from '../../store/pages.js';

import './Home.css';

import coffee from './coffee.jpeg';

export default function Home() {

  const user = useSelector(state => state.session.user);
  const allPages = useSelector(state => state.all_pages);

  const dispatch = useDispatch();

  // load the pages
  useEffect(() => {
    dispatch(getEverySinglePage(user.id));
  }, [dispatch])

  if (allPages) console.log(allPages);

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

  // get a brief snippet for teh note
  const getShortSnippet = (content) => {
    const snippet = [];
    content = content.split('') || "";
    let snipLength = 0;
    if (content.length > 20) snipLength = 20;
    else snipLength = content.length;
    for (let i = 0; i < snipLength; i++) {
        snippet.push(content[i]);
    }

    return snippet.join('');
  }

  const formatDate = (date) => {
    const splitted = date.split(' ');
    return `${splitted[2]} ${splitted[1]}`
  }

  // get some pages to display up in herrr
  const getPagesToDisplay = () => {
    if (allPages) {
      const allPagesArr = Object.values(allPages);
      let numToShow = 4;
      let result = [];
      for (let i = 0; i < numToShow; i++) {
        result.push(allPagesArr[i]);
      }
      return result;
    }
  }

  // variable to hold our few pages
  let displayPages;

  // useEffect to grab those page snippets when pages load
  useEffect(() => {
    displayPages = getPagesToDisplay();
  }, [allPages]);

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

          <div style={{ backgroundColor: "rgba(171, 171, 171, .1)", padding: '15%', zIndex: "-1"}}></div>
          <div className="contain-widgets">

              <div className="notes-preview">
                <div className="notes-preview-top">
                  <p>RECENT NOTES<i className="fa-solid fa-angle-right"></i></p>
                </div>
                <div className="notes-preview-display">
                  {allPages &&
                    displayPages.map(pg =>
                      <div key={pg.id}>
                        <p>{pg.title}</p>
                        <p>{getShortSnippet(pg.content)}></p>
                        <p>{formatDate(pg.updated_at)}</p>
                      </div>)
                  }
                </div>
              </div>

              <div className="scratch">
              </div>
          </div>
        </div>
    </div>
  )
}
