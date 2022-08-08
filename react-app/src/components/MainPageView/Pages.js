import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPages, editPage, addToTrash } from '../../store/pages';

import './MainPageView.css';

export default function Pages({ notebookId, userId, pageId }) {

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



    // update view whenever pageId changes

  if (!currentPage || !allPagesOfNotebook) return <p className="loading pages right-div">Create or select a page</p>
  return (
    <div className="right-div">
        <div className="above-page">
            {/* Rich text stuff goes here eventually */}
            <div className="trash" onClick={sendPageToTrash}>
                <i className="fa-solid fa-trash-can"></i>
            </div>
        </div>
        <div className="page-view">
            {!editTitle ?
            <div className="page-title" onClick={() => setEditTitle(true)}>
                <h1>{currentPage.title}</h1>
            </div> :
            <div className="page-title">
                <input
                    className="page-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleBlur}
                />
            </div>}
            {!editContent &&
            <div
                className="page-contents"
                value={content}
                onClick={() => setEditContent(true)}
                style={{padding:"12px 40px 0px"}}
            >
                {currentPage.content ? currentPage.content : "Start writing here!"}
            </div>}
            {editContent &&
            <div className='page-contents'>
                <textarea
                    className="page-contents"
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
