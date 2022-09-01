import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getEverySinglePage } from '../../store/pages.js';
import { Link } from 'react-router-dom';
import Scratch from './Scratch.js';

import './Home.css';
import './Scratch.css';

import coffee from './coffee.jpeg';

export default function Home() {

  const user = useSelector(state => state.session.user);
  const allPages = useSelector(state => state.pages);

  const [displayPages, setDisplayPages] = useState("");

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
    if (content) {
      // we are getting 90 characters snip length
      if (content.length > 40) {
          return content.slice(0, 40).trim() + '...';
      } else {
          return content;
      }
  }
  }

  const formatDate = (date) => {
    const splitted = date.split(' ');
    return `${splitted[2]} ${splitted[1]}`
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

  const returnProperLocation = (nbId, pId) => {
    return {
      pathname: `/${nbId}`,
      state: { pageId: pId }
    }
  }


  // useEffect to grab those page snippets when pages load
  useEffect(() => {
    setDisplayPages(getPagesToDisplay());
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
                  <p>RECENT CONTENT<i className="fa-solid fa-angle-right"></i></p>
                </div>
                <div className="notes-preview-bottom">
                  {displayPages.length ?
                    displayPages.map(pg =>
                      <Link key={pg.id} to={returnProperLocation(pg.notebookId, pg.id)} className="inner-notes">
                        <div>
                          <p id="pg-title">{pg.title || "Untitled"}</p>
                          <p id="pg-snippet">{getShortSnippet(pg.content)}</p>
                        </div>
                          <p id="pg-date">{formatDate(pg.updated_at)}</p>
                      </Link>
                     ):
                      <p id="no-notes">You have no notes yet, create your first note in a notebook to see them here!</p>}
                </div>
              </div>

              <div className="scratch">
                <Scratch userId = {user.id} />
              </div>
          </div>
        </div>
    </div>
  )
}
