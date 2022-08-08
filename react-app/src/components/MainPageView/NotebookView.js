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
    const [title, setTitle] = useState("");

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
          title
        };

        const editedNotebook = await(dispatch(editNotebook(data, notebookId)))

        if (Array.isArray(editedNotebook)) {
            setErrors(editedNotebook);
        } else {
            console.log("edited notebook success")
            getNotebooks();
            setShowEditBox(false);
            setTitle("");
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

    useEffect(() => {
        dispatch(getAllPages(user.id, notebookId));
    }, [dispatch])


    if (!user || !currentNotebook || !allPagesOfNotebook) return <p className="loading nbview">Loading...</p>
  return (
    <div className="out-container">
        <div className="left-div">
            <h1 className="title">
                {` `}<i className="fa-solid fa-book"></i>{` `}
                {currentNotebook.title}
            </h1>
            <div className="notebook-options-dropdown" onClick={openMenu}>
                <i className="fa-solid fa-ellipsis"></i>
            </div>
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
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
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
            {Object.values(allPagesOfNotebook).map(page =>
                <NavLink to={`/${notebookId}/`} key={page.id} className="pages" activeClassName="page-active"  onClick={() => setSelectedPageId(page.id)}>
                    {page.title}
                </NavLink>)}
        </div>
        <Pages notebookId={notebookId} userId={user.id} pageId={selectedPageId} />
    </div>
  )
}
