import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPages, editPage } from '../store/pages';

export default function Pages({ notebookId, userId, pageId }) {

    const allPagesOfNotebook = useSelector(state => state.pages)

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editContent, setEditContent] = useState(false);
    const [editTitle, setEditTitle] = useState(false);



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

    const handleBlur = async (e) => {

        setErrors([]);

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

        setEditContent(false);
        setEditTitle(false);


    }

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
            {!editTitle ?
            <div className="page-title" onClick={() => setEditTitle(true)}>
                {currentPage.title}
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
                aria-placeholder="Start writing here"
                aria-multiline="true"
                style={{padding:"12px 40px 0px"}}
            >
                {currentPage.content}
            </div>}
            {editContent &&
            <div className='page-contents'>
                <textarea
                    className="page-contents"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onBlur={handleBlur}
                    enterKeyHint="enter"
                    aria-placeholder="Start writing here"
                    aria-multiline="true"
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
