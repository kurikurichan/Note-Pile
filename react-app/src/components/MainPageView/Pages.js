import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPages, editPage, addToTrash } from "../../store/pages";
import Editor from "./Editor/Editor";
import { getFormattedDate, isEmpty } from "../../utils";

import "./MainPageView.css";

export default function Pages({
  notebookId,
  userId,
  pageId,
  currentNb,
  allPages,
}) {
  // title of page
  const [title, setTitle] = useState("");
  // content (text) of page
  const [content, setContent] = useState("");

  // set state of the save button (Save, Saving, Saved)
  const [save, setSave] = useState("Save");

  // set state of title length warning
  const [tWarn, setTWarn] = useState(false);
  // set state of page body length warning
  const [cWarn, setCWarn] = useState(false);
  // data of currentPage, {
  //   "content": "<p>qiqiiqiqiiqi</p>",
  //   "created_at": "Thu, 15 Feb 2024 20:11:18 GMT",
  //   "id": 15,
  //   "notebookId": 1,
  //   "title": "",
  //   "trashed": false,
  //   "updated_at": "Thu, 15 Feb 2024 20:17:18 GMT",
  //   "userId": 1
  // }
  const [currentPage, setCurrentPage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentPage(
      Object.values(allPages).filter((page) => +page.id === +pageId)[0]
    );
  }, [pageId]);

  useEffect(() => {
    // after a few seconds, get rid of of the title warning area
    if (tWarn) {
      setTimeout(() => {
        setTWarn(false);
      }, 1800);
    }
    // do same for body content area
    if (cWarn) {
      setTimeout(() => {
        setCWarn(false);
      }, 1800);
    }
  }, [tWarn, cWarn]);

  // load the fields we have with stuff we have already
  useEffect(() => {
    if (currentPage) {
      setTitle(currentPage.title || "");
      setContent(currentPage.content);
    }
    // reset the save button
    setSave("Save");
  }, [currentPage]);

  const handleBlur = async () => {
    // phase 2 save button
    setSave("Saving");

    const data = {
      title,
      content,
    };

    // add try/catch  here
    const edited = await dispatch(editPage(data, pageId));

    // errorss will come back in array form
    // change this to accept a positive

    if (Array.isArray(edited)) {
      setSave("Not Saved");
    } else {
      getPages();
      setSave("Saved");
    }
  };

  const sendPageToTrash = async (e) => {
    e.preventDefault();

    const data = {
      userId,
      trashed: true,
    };

    const sentToTrash = await dispatch(addToTrash(data, pageId));

    if (sentToTrash) {
      getPages();
    }
  };

  const getPages = async () => {
    await dispatch(getAllPages(userId, notebookId));
  };

  // make save button state "save" again after typing starts
  useEffect(() => {
    setSave("Save");
  }, [title, content]);

  return (
    <div className="right-div">
      {currentPage && (
        <>
          <div className="contain-the-top-shiz">
            <div className="above-page">
              <div className="left-icons">
                <i
                  className="fa-solid fa-book nb-title-book"
                  style={{ marginRight: "5px" }}
                ></i>
                <p className="nb-title"> {currentNb.title} </p>
              </div>
              <div className="right-icons">
                <button
                  className={`green-button save ${
                    save === "Saving"
                      ? "loading"
                      : save === "Saved"
                      ? "disabled"
                      : ""
                  }`}
                  onClick={handleBlur}
                >
                  {save}
                </button>
                <button
                  className="trash-button delete-but"
                  onClick={sendPageToTrash}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
            <div className="rich-text-stuff">
              <p className="page-title-date" style={{ marginRight: "5px" }}>
                {getFormattedDate(currentPage.updated_at)}{" "}
              </p>
            </div>
          </div>
          <div className="page-view">
            <div className="main-page-title">
              <input
                className={`page-title ${title ? "white" : "grey"}`}
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleBlur}
                maxLength={60}
                onKeyDown={() => title?.length >= 60 && setTWarn(true)}
                onKeyUp={() => title?.length < 60 && setTWarn(false)}
              />
              {tWarn && (
                <p className="len-warning">Maximum title length reached</p>
              )}
            </div>
            <Editor
              content={content}
              setContent={setContent}
              setCWarn={setCWarn}
              handleBlur={handleBlur}
            />
          </div>
          <div className="page-footer">
            {cWarn && (
              <p className="len-warning c">Maximum body length reached</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
