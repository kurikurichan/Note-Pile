import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { getAllNotebooks } from '../../store/notebooks'
import { getAllPages, newPage } from '../../store/pages';
import Pages from './Pages';
import EditNBModal from './EditNBModal';
import { getContentSnippet, formatDate, getPageCount, isEmpty } from '../../utils';

import './MainPageView.css';
import DeleteNBModal from './DeleteNBModal';
import NotFound from '../404/404';
import LoadSidebar from '../404/LoadSidebar';

export default function NotebookView() {
    // this is the component where we can see the list of pages and individual pages of a notebook
    const { notebookId, pageId } = useParams();
    const dispatch = useDispatch();
    const catMenu = useRef(null);
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);

    const user = useSelector(state => state.session.user);
    const allNotebooks = useSelector(state => state.notebooks)
    const allPagesOfNotebook = useSelector(state => Object.values(state.pages).sort((p1, p2) => {
        return Date.parse(new Date(p2.updated_at)) - Date.parse(new Date(p1.updated_at));
    }));

    // for notebook dropdown menu
    const [showMenu, setShowMenu] = useState(false);
    // pages
    const [selectedPageId, setSelectedPageId] = useState(pageId);

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
    let currentNotebook = Object.values(allNotebooks).filter(book => book.id === +notebookId)[0];

    useEffect(() => {
        (async() => {
          await dispatch(getAllNotebooks());
          setLoaded(true);
        })();
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
            setShowMenu(false);
        }

    }

    const getPages = async () => {
        await dispatch(getAllPages(user.id, notebookId));
    };

    // load pages with each notebookId change
    useEffect(() => {
        getPages();
    }, [notebookId]);

    const noNotes = isEmpty(allPagesOfNotebook);

    if (!loaded) return <LoadSidebar />
    if (!user || !currentNotebook) return <NotFound />
  return (
    <div className="out-container">
        <div className="left-div">
            <div className="title-view">
                <h1 className="title">
                    {` `}<i className="fa-solid fa-book"></i>{` `}
                    {currentNotebook.title}
                </h1>
                <div className="notebook-dongles">
                    <p className="page-count">{getPageCount(allPagesOfNotebook)}</p>
                    <div className="notebook-options-dropdown">
                        <i className="fa-solid fa-ellipsis" onClick={openMenu}></i>

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
                // <div key={page.id} className={`pages ${page.id === selectedPageId && 'page-active'}`} onClick={() => setSelectedPageId(page.id)}>
                <div key={page.id} className={`pages ${page.id === selectedPageId && 'page-active'}`} onClick={() => {
                    setSelectedPageId(page.id)
                    history.push(`/${notebookId}/${page.id}`)
                }}>
                    <div className="page-title-content">
                        <p className="page-small-title">{page.title || "Untitled"}</p>
                        <div className="preview">{getContentSnippet(page.content)}</div>
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
        {!noNotes && <Pages
            notebookId={notebookId}
            userId={user.id}
            pageId={selectedPageId}
            currentNb={currentNotebook}
            allPages={allPagesOfNotebook}
         />}

        {noNotes &&
            <div className="right-div"></div>}
    </div>
  )
}
