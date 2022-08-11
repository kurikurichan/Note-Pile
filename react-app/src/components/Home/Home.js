import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getEverySinglePage } from '../../store/pages.js';

import './Home.css';

import coffee from './coffee.jpeg';

export default function Home() {

  const user = useSelector(state => state.session.user);
  const allPages = useSelector(state => state.pages);

  const dispatch = useDispatch();

  // load the pages
  useEffect(() => {
    dispatch(getEverySinglePage(user.id));
  }, [dispatch])


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
      const allPagesArr = Object.values(allPages).sort((p1, p2) => p2.updated_at - p1.updated_at);
      // const allPagesArr = Object.values(allPages);
      let sliced = allPagesArr.slice(0, 4);
      console.log("SLICED :", sliced)
      return allPagesArr.slice(0, 4);
    }
  }

  // variable to hold our few pages
  let displayPages;

  // useEffect to grab those page snippets when pages load
  useEffect(() => {
    let fourPages = getPagesToDisplay();
    displayPages = Object.values(fourPages);
    console.log("ALL of the pages!:", displayPages);
  }, [allPages]);

  return (
    <div className="home-container">
      <div className="scrollable">
          <div className="above-home">

              <img src={coffee} id="coffee" alt="blurred cup in background" />

              <div className="above-home-text">
                <h3>Welcome, {user.username}!</h3>
                <p id="today">{getToday()}</p>
              </div>

          </div>

          {/* <div style={{ backgroundColor: "rgba(171, 171, 171, .1)", padding: '15%', zIndex: "-1"}}></div> */}
          <div className="contain-widgets">

              <div className="notes-preview">
                <div className="notes-preview-top">
                  <p>RECENT NOTES<i className="fa-solid fa-angle-right"></i></p>
                </div>
                <div className="notes-preview-bottom">
                  {displayPages &&
                    displayPages.map(pg =>
                      <div key={pg.id} className="inner-notes">
                        <p>A NOTE WAS REGISTEREED!</p>
                        {/* <p>{pg.title}</p>
                        <p>{getShortSnippet(pg.content)}></p>
                        <p>{formatDate(pg.updated_at)}</p> */}
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
