import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getAllTrash, deletePage } from '../store/pages';
import Pages from './Pages';

export default function Trash() {
    // this is the component where we can see the list of pages and individual pages of a notebook
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const allTrashedPages = useSelector(state => state.pages)

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [selectedPageId, setSelectedPageId] = useState("")


    // single page to use in our dynamic page view
    let currentPage;

    if (allTrashedPages && selectedPageId) {
        currentPage = Object.values(allTrashedPages).filter(page => page.id == selectedPageId)[0];
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

    useEffect(() => {
        dispatch(getAllTrash(user.id));
    }, [dispatch])

    const handleEmptyTrash = async (e) => {

        e.preventDefault();
        // loop thru trash and delete each page in it
        for (let page in Object.values(allTrashedPages)) {
            await dispatch(deletePage(user.id, page.id))
        }

        getTheTrash();

    }

    //TODO:
    // - add restore note button

    if (!user || !allTrashedPages) return <p className="loading">Loading...</p>
  return (
    <>
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
                <button>
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
    </>
  )
}
