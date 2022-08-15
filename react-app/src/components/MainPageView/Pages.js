import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPages, editPage, addToTrash } from '../../store/pages';

import './MainPageView.css';

export default function Pages({ notebookId, userId, pageId, currentNb }) {

    const allPagesOfNotebook = useSelector(state => state.pages)

    const [errors, setErrors] = useState([]);
    // edit page title & content
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    //  toggle edit forms for page title & content
    const [editContent, setEditContent] = useState(false);
    const [editTitle, setEditTitle] = useState(false);

    // set state of the save button
    const [save, setSave] = useState("Save");

    // set state of title length warning
    const [tWarn, setTWarn] = useState(false);
    // set state of page body length warning
    const [cWarn, setCWarn] = useState(false);
    // set state of sent to trash message
    const [sent, setSent] = useState(false);

    // for resizing text area
    const [textAreaHeight, setTextAreaHeight] = useState(40);

    const dispatch = useDispatch();

    // single page to use in our dynamic page view
    let currentPage;

    if (allPagesOfNotebook) {
        currentPage = Object.values(allPagesOfNotebook).filter(page => +page.id === +pageId)[0];
    }

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
        // trash message
        if (sent) {
            setTimeout(() => {
                setSent(false);
            }, 1800);
        }

    }, [tWarn, cWarn, sent]);

    useEffect(() => {
        dispatch(getAllPages(userId, notebookId));
    }, [dispatch])

    // load the fields we have with stuff we have already
    useEffect(() => {
        if (currentPage) {
            setTitle(currentPage.title);
            setContent(currentPage.content);
            console.log('set the page')
        }
        // reset the save button
        setSave("Save");
    }, [pageId])


    const handleBlur = async (e) => {

        e.preventDefault();
        // phase 2 save button
        setSave("Saving");

        const data = {
          title,
          content
        };

        const edited = await dispatch(editPage(data, pageId));

        if (Array.isArray(edited)) {
            setErrors(edited);
            setSave("Not Saved");
        } else {
            getPages();
            setSave("Saved")
        }

        setEditTitle(false);
        setEditContent(false);

        /// 3 phases of save button
        // 1: "Save" plain
        // 2.) "Saving" spin wheel
        // 3.) "Saved" checkmark


    };

    const sendPageToTrash = async (e) => {

        e.preventDefault()

        const data = {
            userId,
            trashed: true
        }

        const sentToTrash = await dispatch(addToTrash(data, pageId));

        if (sentToTrash) {
            getPages();
            setSent(true);
        }

    }

    const getPages = async () => {
        await dispatch(getAllPages(userId, notebookId));
    };

    //  get and format updated date
    const getFormattedDate = (date) => {
        const theDate = new Date(date);
        return "Last edited on " + theDate.toLocaleDateString('en-CA', {
            dateStyle: "medium"
        });
    };

    const contentAutoGrow = (e) => {

        // auto grow text area as user types
        // also handle saving the info in local state here

        if (e.target.scrollHeight > e.target.clientHeight) {

            setTextAreaHeight(e.target.scrollHeight);
        }

    };


  if (!allPagesOfNotebook) return <p className="loading right-div">Loading...</p>
  return (
    <div className="right-div">
        {currentPage &&
        <>
            <div className="contain-the-top-shiz">
                <div className="above-page">
                    <div className="left-icons">
                        <i className="fa-solid fa-book nb-title-book"></i>{` `}
                        <p className="nb-title"> {currentNb.title} </p>
                    </div>
                    <div className="right-icons">
                        <button
                            className={`green-button save ${save === "Saving" ? 'loading' : save === "Saved" ? 'disabled' : ''}`}
                            onClick={handleBlur}
                        >
                            {save}
                            {save === "Saved" && <i className="fa-solid fa-check in-save-icon" style={{color: 'rgb(214, 255, 225)'}}></i>}
                        </button>
                        <button className="trash-button delete-but" onClick={sendPageToTrash}>
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <div className="rich-text-stuff">
                    <p className="page-title-date"> {getFormattedDate(currentPage.updated_at)} </p>
                    {sent && <p id="sent-to-trash">Page sent to trash</p>}
                </div>
            </div>
            <div className="page-view">
                {!editTitle ?
                <div className={`main-page-title ${currentPage.title ? 'white' : 'grey'}`} onClick={() => setEditTitle(true)} >
                    <h1>{currentPage.title || "Title"}</h1>
                </div> :
                <div className="main-page-title">
                    <input
                        className={`page-title ${currentPage.title ? 'white' : 'grey'}`}
                        value={title === null ? "" : title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleBlur}
                        maxLength={60}
                        onKeyDown={() => title?.length >= 60 && setTWarn(true)}
                        onKeyUp={() => title?.length < 60 && setTWarn(false)}
                    />
                    {tWarn && <p className="len-warning">Maximum title length reached</p>}

                </div>}
                    {!editContent &&
                    <div
                        className={`page-contents ${currentPage.content ? 'white' : 'grey'}`}
                        value={currentPage.content}
                        onClick={() => setEditContent(true)}
                        style={{padding:"12px 40px 0px"}}
                    >
                        {currentPage.content ? currentPage.content : "Start writing here!"}
                    </div>}
                {editContent &&
                    <>
                        <textarea
                            className="page-edit-contents white"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                contentAutoGrow(e);
                            }}
                            onFocus={(e) => contentAutoGrow(e)}
                            onBlur={handleBlur}
                            rows={textAreaHeight}
                            enterKeyHint="enter"
                            placeholder="Start writing here!"
                            translate="no"
                            maxLength={10000}
                            style={{padding:"12px 40px 0px"}}
                            onKeyDown={() => content?.length >= 10000 && setCWarn(true)}
                            onKeyUp={() => content?.length < 10000 && setCWarn(false)}
                        / >
                    </>


                }
            </div>
            <div className="page-footer">
                {cWarn && <p className="len-warning c">Maximum body length reached</p>}
            </div>
        </>}
    </div>
  )
}
