import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from 'react-router-dom';
import { getAllNotebooks } from '../../store/notebooks'
import { getAllPages, newPage } from '../../store/pages';
import Pages from './Pages';
import EditNBModal from './EditNBModal';

import './MainPageView.css';
import DeleteNBModal from './DeleteNBModal';

export default function NotebookView() {
    // this is the component where we can see the list of pages and individual pages of a notebook
    const { notebookId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const catMenu = useRef(null);

    // change pageId if we get a location (from home)
    useEffect(() => {
        if (location.state) {
            setSelectedPageId(location.state.pageId);
        }
    }, [location]);

    const user = useSelector(state => state.session.user);
    const allNotebooks = useSelector(state => state.notebooks)
    const allPagesOfNotebook = useSelector(state => state.pages)

    // for notebook dropdown menu
    const [showMenu, setShowMenu] = useState(false);
    // pages
    const [selectedPageId, setSelectedPageId] = useState("")


    // modal popups in dropdown menu
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    // open the menu I guess
    const openMenu = (e) => {
        e.stopPropagation();
        setShowMenu(true);
    }

    // Close the nb dropdown menu when it is clicked outside of
    useEffect(() => {
        const closeMenu = (e) => {
            // correlate clicks to to dif locations on the page
            // if current == blah do nothing
            let modals = document.getElementById("modal-content");
            if (catMenu.current && showMenu && !catMenu.current.contains(e.target)) {
                if (e.target !== modals) {
                    setShowMenu(false);
                }
            }
        };

        // event listener for when mouse is down anywhere in document
        document.addEventListener('mouseup', closeMenu);

        return () => {
            // clean up event listener
            document.removeEventListener("mouseup", closeMenu);
        }
    }, [showMenu]);

    // single notebook based on notebookId
    let currentNotebook;

    if (allNotebooks) {
        currentNotebook = Object.values(allNotebooks).filter(book => book.id === +notebookId)[0];
    }

    useEffect(() => {
        dispatch(getAllNotebooks());
    }, [dispatch])

    // Pages stuff

    const handleNewPage = async (e) => {

        e.preventDefault();

        const data = {
            userId: user.id,
            notebookId
        }

        const createPage = await(dispatch(newPage(data, notebookId)))

        if (createPage) {
            getPages();
            setSelectedPageId(createPage.id);
            // setShowMenu(false);
        }

    }

    const getPages = async () => {
        await dispatch(getAllPages(user.id, notebookId));
    };

    // count dem pages for display
    const getPageCount = () => {
        let numPages = 0;
        if (allPagesOfNotebook) {
            numPages = Object.values(allPagesOfNotebook).length;
        }
        // get proper ending based on length
        if (numPages === 1) return `${numPages} page`;
        else return `${numPages} pages`;
    }

    const formatDate = (date) => {
        if (date) {
            const splitted = date.split(' ');
            return `${splitted[2]} ${splitted[1]}`;
        }
    }

    const getContentSnippet = (content) => {
        if (content) {
            // we are getting 90 characters snip length
            if (content.length > 90) {
                return content.slice(0, 90).trim() + '...';
            } else {
                return content;
            }
        }
    }

    // make an auto select page function here. run inside of useEffect when notebookId changes
    const findFirstPage = () => {
        // initialize to first page OR current page if there is one
        if (allPagesOfNotebook) {
            const firstPage = Object.values(allPagesOfNotebook)[0];
            if (firstPage) {
                setSelectedPageId(firstPage.id);
                console.log('first page set');
            }
        }
    };

    // load pages with each notebookId change
    useEffect(() => {
        getPages();
        // also omg close the dumb menu lol
        // findFirstPage();
        // setShowMenu(false);
    }, [notebookId]);



    const noNotes = allPagesOfNotebook && Object.values(allPagesOfNotebook).length === 0;


    if (!user || !currentNotebook || !allPagesOfNotebook) return <p className="loading nbview">Loading...</p>
  return (
    <div className="out-container">
        <div className="left-div">
            <div className="title-view">
                <h1 className="title">
                    {` `}<i className="fa-solid fa-book"></i>{` `}
                    {currentNotebook.title}
                </h1>
                <div className="notebook-dongles">
                    <p className="page-count">{getPageCount()}</p>
                    <div className="notebook-options-dropdown">
                        <i className="fa-solid fa-ellipsis" onClick={openMenu} style={{cursor: "pointer"}}></i>

                        {showMenu &&
                        <div className="profile-dropdown" ref={catMenu} >
                            <div onClick={handleNewPage} style={{cursor: "pointer"}}>Add a Page</div>
                            <div onClick={() => setShowEdit(true) } style={{cursor: "pointer"}}>Rename Notebook</div>
                            <div onClick={() => setShowDelete(true)} style={{cursor: "pointer"}}>Delete Notebook</div>
                        </div>}
                        <>
                            {showEdit && <EditNBModal user={user} notebookId={notebookId} allNbs={allNotebooks} showModal={showEdit} setShowModal={setShowEdit} />}
                            {showDelete && <DeleteNBModal notebookId={notebookId} showModal={showDelete} setShowModal={setShowDelete} />}
                        </>


                    </div>
                </div>


            </div>
            {Object.values(allPagesOfNotebook).map(page =>
                <div key={page.id} className={`pages ${page.id === selectedPageId && 'page-active'}`} onClick={() => setSelectedPageId(page.id)}>
                    <div className="page-title-content">
                        <p className="page-small-title">{page.title || "Untitled"}</p>
                        <p className="preview">{getContentSnippet(page.content)}</p>
                    </div>
                    <p className="page-date">{formatDate(page.updated_at)}</p>
                </div>)}


            {noNotes &&

                <div className="no-pages">
                    <i id="big-note" className="fa-solid fa-book-open"></i>
                    <h3 id="page-empty">It all begins with pages</h3>
                    <p>Click the '...' button above and select "Add a Page" to create a page.</p>
                </div>}
        </div>
        {Object.values(allPagesOfNotebook).length > 0 && <Pages
            notebookId={notebookId}
            userId={user.id}
            pageId={selectedPageId}
            currentNb={currentNotebook}
            allPages={allPagesOfNotebook}
         />}
    </div>
  )
}
