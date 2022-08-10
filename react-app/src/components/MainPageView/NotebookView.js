import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getAllNotebooks, editNotebook, deleteNotebook } from '../../store/notebooks'
import { getAllPages, newPage } from '../../store/pages';
import Pages from './Pages';

import './MainPageView.css';

export default function NotebookView() {
    // this is the component where we can see the list of pages and individual pages of a notebook
    const { notebookId } = useParams();
    // console.log("notebookID: ", notebookId, "pageId: ", pageId);
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const allNotebooks = useSelector(state => state.notebooks)
    const allPagesOfNotebook = useSelector(state => state.pages)


    const [showMenu, setShowMenu] = useState(false);
    const [showEditBox, setShowEditBox] = useState(false);
    const [errors, setErrors] = useState([]);
    const [nbTitle, setNbTitle] = useState("");


    // pages
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [selectedPageId, setSelectedPageId] = useState("")

    // This is all for the notebooks drop down menu (for edit & delete)
    const openMenu = () => {
      setShowMenu(!showMenu)
    };

    // For dropdown menu, editing notebooks
    const handleRenameNotebook = () => {
        setShowEditBox(!showEditBox)
    };

    // dispatch edit notebooks
    const handleNotebookEdit = async (e) => {

        e.preventDefault();

        setErrors([]);

        const data = {
          userId: user.id,
          nbTitle
        };

        const editedNotebook = await(dispatch(editNotebook(data, notebookId)))

        if (Array.isArray(editedNotebook)) {
            setErrors(editedNotebook);
        } else {
            console.log("edited notebook success")
            getNotebooks();
            setShowEditBox(false);
            setNbTitle("");
        }
    };

    // for dispatching delete notebook
    const handleNotebookDelete = async (e) => {
        e.preventDefault(e);

        await dispatch(deleteNotebook(notebookId));
        history.push("/home");
    };

    // single notebook based on notebookId
    let currentNotebook;

    if (allNotebooks) {
        currentNotebook = Object.values(allNotebooks).filter(book => book.id === +notebookId)[0];
    }

    const getNotebooks = async () => {
        await dispatch(getAllNotebooks());
    };

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

    // make an auto select page function here. run inside of useEffect when notebookId changes
    const findFirstPage = (allPages) => {
        // we already have notebook
        // we already have its pages
        // go thru and return the first page if it exists
        let pagesArr = Object.values(allPages);
        if (pagesArr[0]) {
            console.log("pagesArr[0] in findFirstPage", pagesArr[0])
            console.log("pagesNotebook in findFirstPage", pagesArr[0].id)
            setSelectedPageId(pagesArr[0].id);
        }
    };


    useEffect(() => {
        dispatch(getAllPages(user.id, notebookId));
        if (allPagesOfNotebook) {
            findFirstPage(allPagesOfNotebook);
            console.log("selectedPageId in NBView useeffect", selectedPageId);
        }
    }, [dispatch, notebookId])


    useEffect(() => {
        console.log('pageId change nbView', selectedPageId);
    }, [selectedPageId])


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
                    <div className="notebook-options-dropdown" onClick={openMenu}>
                        <i className="fa-solid fa-ellipsis"></i>

                        {showMenu &&
                        <div className="profile-dropdown">
                            <div onClick={handleNewPage}>Add a Page</div>
                            <div onClick={handleRenameNotebook}>Rename Notebook</div>
                            {showEditBox &&
                                <form className="notebook-form" onSubmit={handleNotebookEdit}>
                                    <label className="notebook-label">
                                        <button onClick={(e) => setShowEditBox(false)}>x</button>
                                        <input
                                            className="notebook-input"
                                            type="text"
                                            placeholder="Untitled"
                                            value={nbTitle}
                                            onChange={(e) => setNbTitle(e.target.value)}
                                        />
                                        <button type="Submit">+</button>
                                    </label>
                                    <div className="errs">
                                        {errors && errors.map((error, ind) => (
                                        <div key={ind} className="error">{error}</div>
                                    ))}
                                    </div>
                                </form> }
                            <div onClick={handleNotebookDelete}>Delete Notebook</div>
                        </div>}


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
        </div>
        <Pages
            notebookId={notebookId}
            userId={user.id}
            pageId={selectedPageId}
            currentNb={currentNotebook}
            content={content}
            setContent={setContent}
            title={title}
            setTitle={setTitle}
         />
    </div>
  )
}
