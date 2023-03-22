import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getEverySinglePage } from '../../store/all_pages.js';
import { Link } from 'react-router-dom';
import Scratch from './Scratch.js';
import { htmlToText, formatDate } from '../../utils/index.js';


import './Home.css';
import './Scratch.css';

import coffee from './coffee.jpeg';
import LoadSidebar from '../404/LoadSidebar.js';

export default function Home() {

  const user = useSelector(state => state.session.user);
  const allPages = useSelector(state => state.all_pages);

  const [displayPages, setDisplayPages] = useState("");

  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  // load the pages
  useEffect(() => {
    (async() => {
      await dispatch(getEverySinglePage(user.id));
      setLoaded(true);
    })();
  }, [dispatch])

    //  get and format long date
    const getToday = () => {
      const today = new Date();
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ]
      return weekdays[today.getDay()] + ", " +
      today.toLocaleDateString('en-CA', {
          dateStyle: "long"
      });
  };

  // get a brief snippet for teh note
  const getShortSnippet = (content) => {
    if (content) {
      // we are getting 90 characters snip length
      if (content.length > 40) {
          return content.slice(0, 40).trim() + '...';
      } else {
          return content;
      }
  }
  }

  // get some pages to display up in herrr
  // grab 4 most recent ones
  const getPagesToDisplay = () => {
    if (allPages) {
      const allPagesArr = Object.values(allPages).filter(pg => pg.content).sort((p1, p2) => {
        return Date.parse(new Date(p2.updated_at)) - Date.parse(new Date(p1.updated_at));
      });
      return allPagesArr.slice(0, 4);
    }
  }


  // useEffect to grab those page snippets when pages load
  useEffect(() => {
    setDisplayPages(getPagesToDisplay());
  }, [allPages]);

  if (!loaded) return <LoadSidebar />;
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

          <div className="contain-widgets">

              <div className="notes-preview">
                <div className="notes-preview-top">
                  <p>RECENT PAGES<i className="fa-solid fa-angle-right"></i></p>
                </div>
                <div className="notes-preview-bottom">
                  {displayPages.length ?
                    displayPages.map(pg =>
                      <Link key={pg.id} to={`/${pg.notebookId}/${pg.id}`} className="inner-notes">
                        <div>
                          <p id="pg-title">{pg.title || "Untitled"}</p>
                        </div>
                        <div id="snippet-box">
                          <div id="pg-snippet">{getShortSnippet(htmlToText(pg.content))}</div>
                        </div>
                        <div id="bot-date">
                          <p id="pg-date">{formatDate(pg.updated_at)}</p>
                        </div>
                      </Link>
                     ):
                      <p id="no-notes">You have no pages yet, create your first note in a notebook to see them here!</p>}
                </div>
              </div>

              <div className="scratch">
                <Scratch user = {user} />
              </div>
          </div>
        </div>
    </div>
  )
}
