import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllTrash, addToTrash, deletePage } from '../store/pages';

export default function Trash() {
    // this is the component where we can see the list of pages and individual pages of a notebook
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const allTrashedPages = useSelector(state => state.pages)

    // initial load trashed pages

    useEffect(() => {
        dispatch(getAllTrash(user.id));
    }, [dispatch])

    console.log("All trashed pages", allTrashedPages);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [selectedPageId, setSelectedPageId] = useState("")


    // single page to use in our dynamic page view
    let currentPage;

    if (allTrashedPages) {
        currentPage = Object.values(allTrashedPages).filter(page => +page.id === +selectedPageId)[0];
    }

    useEffect(() => {
        if (currentPage) {
            setTitle(currentPage.title);
            setContent(currentPage.content);
        }
    }, [selectedPageId])


    const getTheTrash = async () => {
        await dispatch(getAllTrash(user.id));
    };

    const restorePage = async(e) => {

        e.preventDefault()

        const data = {
            userId: user.id,
            trashed: false
        }

        const restored = await dispatch(addToTrash(data, selectedPageId));

        if (restored) {
            console.log("Page has been restored");
            getTheTrash();
        }
    }



    const handleEmptyTrash = async (e) => {

        e.preventDefault();
        // loop thru trash and delete each page in it
        try {
            for (let page of Object.values(allTrashedPages)) {
                await dispatch(deletePage(user.id, page.id));
            }
        } catch(e) {
            console.log(e);
        }

        getTheTrash();

    }

    //TODO:
    // - add restore note button

    if (!user || !allTrashedPages) return <p className="loading right-div">Loading...</p>
  return (
    <div className="out-container">
        <div className="left-div">
            <h1 className="title">
                {` `}<i className="fa-solid fa-trash"></i>{` `}
                Trash
            </h1>
            <button onClick={handleEmptyTrash}>Empty Trash</button>
            {Object.values(allTrashedPages).map(page =>
                <div key={page.id} onClick={() => setSelectedPageId(page.id)}>
                    {page.title}
                </div>)}
        </div>
        <div className="right-div">
            <div className="above-page">
                <button onClick={restorePage}>
                    Restore Page
                </button>
            </div>
            <div className="page-view">
                <div className="page-title">
                    {currentPage && title}
                </div>
                <div
                    className="page-contents"
                    style={{padding:"12px 40px 0px"}}
                >
                    {currentPage && content}
                </div>
            </div>
            <div className="page-footer">
            </div>
        </div>
    </div>
  )
}
