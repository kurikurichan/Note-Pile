import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getAllNotebooks, newNotebook } from '../../store/notebooks';
import LogoutButton from '../auth/LogoutButton';

import default_user from './default_user.jpeg';

import './Sidebar.css';

export default function Sidebar() {

    const user = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);

    // for notebooks dropdown selection
    const [noteDropdown, setNoteDropdown] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    // for notebook page url
    const [firstPageNum, setFirstPageNum] = useState("");
    // errors for notebook submit
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");


    const handleNotebookSubmit = async (e) => {

        e.preventDefault();

        setErrors([]);

        const data = {
          userId: user.id,
          title
        };

        const postNotebook = await(dispatch(newNotebook(data)))

        console.log("post notebook", postNotebook);

        if (Array.isArray(postNotebook)) {
            setErrors(postNotebook);
        } else {
            console.log("new notebook success")
            getNotebooks();
            setTitle("");
        }

        handleShowEdit();

    };

    const handleDropDown = () => {
        setNoteDropdown(!noteDropdown);
        if (!noteDropdown) {
            setShowEdit(false);
            setErrors([]);
        }
    }

    const handleShowEdit = () => {
        setShowEdit(!showEdit);
    }

    const handleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    }

    // test CRUDS!
    // notebooks
    // first test get notebooks
    const dispatch = useDispatch();

    const getNotebooks = async () => {
        await dispatch(getAllNotebooks());
    }

    useEffect(() => {
        dispatch(getAllNotebooks());
    }, [dispatch])

    if (!notebooks || !user) return <p className="loading">Loading...</p>
  return (
    <div className="sidebar">
        <div className="user-dropdown" onClick={handleUserMenu}>
                <img src={default_user} id="user-image"/>
                <p id="main-username">{user.username}</p>
                <i className="fa-solid fa-angle-down" style={{fontSize: "10px"}}></i>
        </div>
        {showUserMenu &&
        <div id="logout-div">
            <p id="account">ACCOUNT</p>
            <div className="username-block">
                <i className="fa-solid fa-check" style={{color: 'skyblue'}}></i>
                <img src={default_user} className="user-image"/>
                <div id="user-info">
                    <p className="user-name">{user.username}</p>
                    <p className='user-email'>{user.email}</p>
                </div>
            </div>
            <LogoutButton />
        </div>}

        <span className="home-button">
            <NavLink to="/home" className="navlink" activeClassName='sb-active'>
            <i className="fa-solid fa-house"></i>
            {` `}Home
            </NavLink>
        </span>
        <span className="dropdown-button" onClick={handleDropDown}>
            {!noteDropdown && <i className="fa-solid fa-caret-right"></i>}
            {noteDropdown && <i className="fa-solid fa-caret-down"></i>}
            {` `}<i className="fa-solid fa-book"></i>{` `}Notebooks
        </span>
        { noteDropdown && (
            <ul className="notebook-dropdown">
                {Object.values(notebooks).map(book =>
                    <li key={book.id}>
                        <NavLink to={`/${book.id}`} className="notebook-li" activeClassName='sb-active'>{book.title}</NavLink>
                    </li>)}

                { showEdit && (
                <div className="form-holder">
                    <form className="notebook-form" onSubmit={handleNotebookSubmit}>
                        <label className="notebook-label">
                            <button onClick={(e) => setShowEdit(false)}>x</button>
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
                    </form>
                </div>)}

                { !showEdit && (
                <li onClick={handleShowEdit} id="new-notebook">
                    <i className="fa-solid fa-book-medical"></i>
                    {` `}New Notebook
                </li>)
                }

            </ul>
        )}
        <span id="trash-link">
            <NavLink to="/trash" className="navlink" activeClassName='sb-active'><i className="fa-solid fa-trash"></i>{` `}Trash</NavLink>
        </span>
        <div id="sidebar-padding">

        </div>
        <div className="sidebar-footer">

        </div>

    </div>
  )
}
