import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getAllNotebooks } from "../../store/notebooks";
import { getAllPages, newPage } from "../../store/pages";
import Pages from "./Pages";
import {
  getContentSnippet,
  formatDate,
  getPageCount,
  isEmpty,
} from "../../utils";

import "./MainPageView.css";
import NotFound from "../404/404";
import LoadSidebar from "../404/LoadSidebar";
import NotebookOptionsDropdown from "./NotebookOptionsDropdown";

export default function NotebookView() {
  // this is the component where we can see the list of pages and individual pages of a notebook
  let { notebookId, pageId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const [currentNotebook, setCurrentNotebook] = useState(null);

  const user = useSelector((state) => state.session.user);
  const allNotebooks = useSelector((state) => state.notebooks);
  const allPagesOfNotebook = useSelector((state) =>
    Object.values(state.pages).sort((p1, p2) => {
      return (
        Date.parse(new Date(p2.updated_at)) -
        Date.parse(new Date(p1.updated_at))
      );
    })
  );

  const noNotes = isEmpty(allPagesOfNotebook);

  // fix selected page
  if (pageId === "recent") {
    if (!noNotes) pageId = allPagesOfNotebook[0].id;
  }

  // for notebook dropdown menu
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // single notebook based on notebookId
    setCurrentNotebook(
      Object.values(allNotebooks).filter((book) => book.id === +notebookId)[0]
    );
    // load pages with each notebookId change
    getPages();
  }, [notebookId]);

  useEffect(() => {
    (async () => {
      await dispatch(getAllNotebooks());
      setLoaded(true);
    })();
  }, [dispatch]);

  // Pages stuff

  const handleNewPage = async (e) => {
    e.preventDefault();

    const data = {
      userId: user.id,
      notebookId,
    };

    const createPage = await dispatch(newPage(data, notebookId));

    if (createPage) {
      getPages();
      // setSelectedPageId(createPage.id);
      history.push(`/${notebookId}/${createPage.id}`);
      setShowMenu(false);
    }
  };

  const getPages = async () => {
    await dispatch(getAllPages(user.id, notebookId));
  };


  if (!loaded) return <LoadSidebar />;
  if (!user || !currentNotebook) return <NotFound />;
  return (
    <div className="out-container">
      <div className="left-div">
        <div className="title-view">
          <h1 className="title">
            <i
              className="fa-solid fa-book"
              style={{ margin: "0 5px 0 5px" }}
            ></i>
            {currentNotebook.title}
          </h1>
          <div className="notebook-dongles">
            <p className="page-count">{getPageCount(allPagesOfNotebook)}</p>
            <NotebookOptionsDropdown
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              handleNewPage={handleNewPage}
              user={user}
              notebookId={notebookId}
              allNotebooks={allNotebooks}
            />
          </div>
        </div>
        {Object.values(allPagesOfNotebook).map((page) => (
          <div
            key={page.id}
            className={`pages ${page.id == pageId && "page-active"}`}
            onClick={() => {
              history.push(`/${notebookId}/${page.id}`);
            }}
          >
            <div className="page-title-content">
              <p className="page-small-title">{page.title || "Untitled"}</p>
              <div className="preview">{getContentSnippet(page.content)}</div>
            </div>
            <p className="page-date">{formatDate(page.updated_at)}</p>
          </div>
        ))}

        {noNotes && (
          <div className="no-pages">
            <i id="big-note" className="fa-solid fa-book-open"></i>
            <h3 id="page-empty">It all begins with pages</h3>
            <p>
              Click the '...' button above and select "Add a Page" to create a
              page.
            </p>
          </div>
        )}
      </div>
      <Pages
        notebookId={notebookId}
        userId={user.id}
        pageId={pageId}
        currentNb={currentNotebook}
        allPages={allPagesOfNotebook}
      />
    </div>
  );
}
