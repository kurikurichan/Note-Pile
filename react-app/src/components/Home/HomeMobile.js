import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEverySinglePage } from "../../store/all_pages.js";
import { Link } from "react-router-dom";
import Scratch from "./Scratch.js";
import {
  htmlToText,
  formatDate,
  getContentSnippet,
  getToday,
} from "../../utils/index.js";

import "./Home.css";
import "./Scratch.css";

import coffee from "./coffee.jpeg";
import LoadSidebar from "../404/LoadSidebar.js";
import useBreakpoints from "../../utils/useBreakpoints.js";

export default function HomeMobile() {
  // the mobile layout is so different I am making a new component
  const user = useSelector((state) => state.session.user);
  const allPages = useSelector((state) => state.all_pages);

  const [displayPages, setDisplayPages] = useState("");

  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();
  const { isMobile } = useBreakpoints();

  // load the pages
  useEffect(() => {
    (async () => {
      await dispatch(getEverySinglePage(user.id));
      setLoaded(true);
    })();
  }, [dispatch, user.id]);

  const getPagesToDisplay = useCallback(() => {
    if (allPages) {
      const allPagesArr = Object.values(allPages)
        .filter((pg) => pg.content)
        .sort((p1, p2) => {
          return (
            Date.parse(new Date(p2.updated_at)) -
            Date.parse(new Date(p1.updated_at))
          );
        });
      return allPagesArr.slice(0, 4);
    }
  }, [allPages]);

  // useEffect to grab those page snippets when pages load
  useEffect(() => {
    // get some pages to display up in herrr
    // grab 4 most recent ones
    setDisplayPages(getPagesToDisplay());
  }, [allPages, getPagesToDisplay]);

  if (!loaded) return <LoadSidebar />;
  return (
    <div className="home-container">
      <img src={coffee} id="coffee" alt="blurred cup in background" />
      <div className="above-home">
        <div className="above-home-text">
          <h3>Welcome, {user.username}!</h3>
          <p id="today">{getToday()}</p>
        </div>
      </div>

      <div className="contain-widgets">
        <div className="notes-preview">
          <div className="notes-preview-top">
            <p>
              RECENT PAGES<i className="fa-solid fa-angle-right"></i>
            </p>
          </div>
          <div className="notes-preview-bottom">
            {displayPages.length ? (
              displayPages.map((pg) => (
                <Link
                  key={pg.id}
                  to={`/${pg.notebookId}/${pg.id}`}
                  className="inner-notes"
                >
                  <div>
                    <p id="pg-title">{pg.title || "Untitled"}</p>
                  </div>
                  <div id="snippet-box">
                    <div id="pg-snippet">
                      {getContentSnippet(htmlToText(pg.content))}
                    </div>
                  </div>
                  <div id="bot-date">
                    <p id="pg-date">{formatDate(pg.updated_at)}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p id="no-notes">
                You have no pages yet, create your first note in a notebook to
                see them here!
              </p>
            )}
          </div>
        </div>

        <div className="scratch">
          <Scratch user={user} />
        </div>
      </div>
    </div>
  );
}
