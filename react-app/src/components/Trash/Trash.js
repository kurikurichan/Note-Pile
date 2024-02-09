import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrash, addToTrash, deletePage } from "../../store/pages";
import EmptyTrash from "./EmptyTrashModal";
import "./Trash.css";
import NotFound from "../404/404";
import LoadSidebar from "../404/LoadSidebar";
import PermanentlyDeletePage from "./PermanentlyDeletePage";
import {
  getContentSnippet,
  formatDate,
  getPageCount,
  getFormattedDate,
  isEmpty,
} from "../../utils";

export default function Trash() {
  // this is the component where we can see the list of pages and individual pages of a notebook
  const dispatch = useDispatch();

  let { pageId } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const allTrashedPages = useSelector((state) => state.pages);

  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);

  // load the pages
  useEffect(() => {
    (async () => {
      await dispatch(getAllTrash(user.id));
      setLoaded(true);
    })();
  }, [dispatch]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const noTrashedNotes = isEmpty(allTrashedPages);

  // fix selected page
  if (pageId === "all") {
    if (!noTrashedNotes) pageId = Object.values(allTrashedPages)[0].id;
  }

  useEffect(() => {
    // single page to use in our dynamic page view
    setCurrentPage(
      Object.values(allTrashedPages).filter((page) => +page.id === +pageId)[0]
    );
    if (currentPage) {
      setTitle(currentPage.title);
      setContent(currentPage.content);
    }
  }, [pageId]);

  const getTheTrash = async () => {
    await dispatch(getAllTrash(user.id));
  };

  const restorePage = async (e) => {
    e.preventDefault();

    const data = {
      userId: user.id,
      trashed: false,
    };

    const restored = await dispatch(addToTrash(data, pageId));

    if (restored) {
      getTheTrash();
    }
  };

  if (!loaded) return <LoadSidebar />;
  if (!user) return <NotFound />;

  return (
    <div className="out-container">
      <div className="left-div">
        <div className="title-view">
          <h1 className="title">
            {` `}
            <i className="fa-solid fa-trash"></i>
            {` `}
            Trash
          </h1>
          <div className="notebook-dongles">
            <p className="page-count">{getPageCount(allTrashedPages)}</p>
            {!noTrashedNotes && (
              <EmptyTrash
                user={user}
                allTrashedPages={allTrashedPages}
                getTheTrash={getTheTrash}
              />
            )}
          </div>
        </div>

        {Object.values(allTrashedPages).map((page) => (
          <div
            key={page.id}
            className={`pages ${page.id == pageId && "page-active"}`}
            onClick={() => history.push(`/trash/${page.id}`)}
          >
            <div className="page-title-content">
              <p className="page-small-title">{page.title || "Untitled"}</p>
              <p className="preview">{getContentSnippet(page.content)}</p>
            </div>
            <p className="page-date">{formatDate(page.updated_at)}</p>
          </div>
        ))}

        {noTrashedNotes && (
          <div className="no-trashed-pages">
            <i id="big-trash" className="fa-solid fa-trash"></i>
            <h3 id="trash-empty">Your trash is empty</h3>
            <p>
              When you have pages in the trash, click ‘Restore Page’ to restore
              or delete them.
            </p>
          </div>
        )}
      </div>
      <div className="right-div">
        {currentPage && (
          <>
            <div className="above-trash">
              <div className="separate-trash">
                <div className="note-in-trash">Note in Trash</div>
                <p className="page-title-date">
                  {" "}
                  {currentPage && getFormattedDate(currentPage.updated_at)}{" "}
                </p>
              </div>
              <div className="right-icons trashed">
                <button
                  className="green-button restore"
                  style={{ width: "130px" }}
                  onClick={restorePage}
                >
                  Restore Page
                </button>
                <PermanentlyDeletePage
                  user={user}
                  pageId={currentPage.id}
                  getTheTrash={getTheTrash}
                />
              </div>
            </div>

            <div className="page-view">
              <div className="main-page-title white">
                <h1>{currentPage ? currentPage.title : "Untitled"}</h1>
              </div>

              <div
                className="page-contents white"
                style={{ padding: "12px 40px 0px" }}
                dangerouslySetInnerHTML={{ __html: currentPage.content }}
              ></div>
            </div>
            <div className="page-footer"></div>
          </>
        )}
      </div>
    </div>
  );
}
