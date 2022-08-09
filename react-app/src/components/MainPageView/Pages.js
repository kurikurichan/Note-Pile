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

    const dispatch = useDispatch();
    // if (allPagesOfNotebook) console.log("All pages: ", allPagesOfNotebook)

    // single page to use in our dynamic page view
    let currentPage;

    if (allPagesOfNotebook) {
        currentPage = Object.values(allPagesOfNotebook).filter(page => +page.id === +pageId)[0];

        // console.log("allPagesofNOtebook: ", allPagesOfNotebook);
        // console.log("currentPage: ", currentPage);

    }


    useEffect(() => {
        dispatch(getAllPages(userId, notebookId));
    }, [dispatch])

    // load the fields we have with stuff we have already

    useEffect(() => {
        if (currentPage) {
            setTitle(currentPage.title || "Untitled");
            setContent(currentPage.content || " ");
        }
    }, [pageId])


    const handleBlur = async (e) => {

        setContent(e.target.value);

        const data = {
          title,
          content
        };

        const edited = await dispatch(editPage(data, pageId));

        if (Array.isArray(edited)) {
            setErrors(edited);
        } else {
            console.log("edited page success")
            getPages();
        }

        setEditTitle(false);
        setEditContent(false);


    }

    const sendPageToTrash = async (e) => {

        e.preventDefault()

        const data = {
            userId,
            trashed: true
        }

        const sentToTrash = await dispatch(addToTrash(data, pageId));

        if (sentToTrash) {
            console.log("Page has been trashed");
            getPages();
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



    // update view whenever pageId changes

  if (!currentPage || !allPagesOfNotebook) return <p className="loading right-div">Create or select a page</p>
  return (
    <div className="right-div">
        <div className="contain-the-top-shiz">
            <div className="above-page">
                <div className="left-icons">
                    <i className="fa-solid fa-book nb-title-book"></i>{` `}
                    <p className="nb-title"> {currentNb.title} </p>
                </div>
                <button className="trash page-icon" onClick={sendPageToTrash}>
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
            <div className="rich-text-stuff">
                {editTitle ?
                "  Rich text stuff goes here":
                <p className="page-title-date"> {getFormattedDate(currentPage.updated_at)} </p>}
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
                    value={title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleBlur}
                />
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
            <div className='page-contents'>
                <textarea
                    className="page-contents white"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onBlur={handleBlur}
                    enterKeyHint="enter"
                    placeholder="Start writing here"
                    translate="no"
                    style={{padding:"12px 40px 0px"}}
                / >
            </div>


            }
        </div>
        <div className="page-footer">

        </div>
    </div>
  )
}
