import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllTrash, addToTrash, deletePage } from '../../store/pages';
import './Trash.css';

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


    // count dem pages for display
    const getPageCount = () => {
        let numPages = 0;
        if (allTrashedPages) {
            numPages = Object.values(allTrashedPages).length;
        }
        // get proper ending based on length
        if (numPages === 1) return `${numPages} page`;
        else return `${numPages} pages`;
    }

    const formatDate = (date) => {
        const splitted = date.split(' ');
        return `${splitted[2]} ${splitted[1]}`
    }

    const getContentSnippet = (content) => {
        const snippet = [];
        content = content.split('') || "";
        let snipLength = 0;
        if (content.length > 90) snipLength = 90;
        else snipLength = content.length;
        for (let i = 0; i < snipLength; i++) {
            snippet.push(content[i]);
        }

        return snippet.join('');
    }

    const noTrashedNotes = allTrashedPages && Object.values(allTrashedPages).length === 0;

    //TODO:
    // - add restore note button

    if (!user || !allTrashedPages) return <p className="loading right-div">Loading...</p>
  return (
    <div className="out-container">
        <div className="left-div">
            <div className="title-view">
                <h1 className="title">
                    {` `}<i className="fa-solid fa-trash"></i>{` `}
                    Trash
                </h1>
                <div className="notebook-dongles">
                    <p className="page-count">{getPageCount()}</p>
                    {!noTrashedNotes &&
                        <button onClick={handleEmptyTrash}>Empty Trash</button>}
                </div>
            </div>

            {Object.values(allTrashedPages).map(page =>
                <div key={page.id} onClick={() => setSelectedPageId(page.id)}>
                    {page.title}
                </div>)}

            {noTrashedNotes &&

            <div className="no-trashed-pages">
                <i id="big-trash" className="fa-solid fa-trash"></i>
                <h3 id="trash-empty">Your trash is empty</h3>
                <p>When you have pages in the trash, click ‘Restore Page’ to restore or delete them.</p>
            </div>}

        </div>
        <div className="right-div">
            <div className="above-page">
                {!noTrashedNotes &&
                <button onClick={restorePage}>
                    Restore Page
                </button>}
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