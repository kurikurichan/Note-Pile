import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPages } from '../store/pages';

export default function Pages({ notebookId, userId, pageId }) {

    const allPagesOfNotebook = useSelector(state => state.pages)

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");



    // if (allPagesOfNotebook) console.log("All pages: ", allPagesOfNotebook)

    // single page to use in our dynamic page view
    let currentPage;

    if (allPagesOfNotebook) {
        currentPage = Object.values(allPagesOfNotebook).filter(page => page.id == pageId)[0];
    }

    // load the fields we have with stuff we have already

    useEffect(() => {
        if (currentPage) {
            setTitle(currentPage.title);
            setContent(currentPage.content);
        }
    }, [pageId])

    const dispatch = useDispatch();

    const getPages = async () => {
        await dispatch(getAllPages(userId, notebookId));
    };

    useEffect(() => {
        dispatch(getAllPages(userId, notebookId));
    }, [dispatch])

    // update view whenever pageId changes

    if (!currentPage || !allPagesOfNotebook) return <p className="loading">Create or select a page</p>
  return (
    <div className="right-div">
        <div className="above-page">
            {/* Rich text stuff goes here eventually */}
        </div>
        <div className="page-view">
            <div className="page-title">
                {currentPage.title}
            </div>
            <div
                className="page-contents"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                inputmode="text"
                role="textbox"
                contenteditable="true"
                enterkeyhint="enter"
                aria-placeholder="Start writing here"
                aria-multiline="true"
                aria-readonly="false"
                aria-label="Page Content"
                translate="no"
                style={{padding:"12px 40px 0px"}}
            >
                {currentPage.content}
            </div>
        </div>
        <div className="page-footer">

        </div>
    </div>
  )
}
