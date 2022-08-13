import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getAllNotebooks } from '../../store/notebooks';
import LogoutButton from '../auth/LogoutButton';
import CreateNBModal from './CreateNBModal';

import default_user from './default_user.jpeg';
import evernote_logo from './evernote_logo.png';

import './Sidebar.css';

export default function Sidebar() {

    const user = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);

    // for notebooks dropdown selection
    const [noteDropdown, setNoteDropdown] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    // errors for notebook submit
    const [errors, setErrors] = useState([]);





    const handleDropDown = () => {
        setNoteDropdown(!noteDropdown);
        if (!noteDropdown) {
            setShowEdit(false);
            setErrors([]);
        }
    }

    const handleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    }

    const formatTitle = (name) => {

        // cap the title at 15 chars to format for sidebar
        if (name.length > 15) {
            return name.slice(0,15) + '...';
        }
        return name;
    }

    // test CRUDS!
    // notebooks
    // first test get notebooks
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllNotebooks());
    }, [dispatch])

    if (!notebooks || !user) return <p className="loading">Loading...</p>
  return (
    <div className="sidebar-wrap">
        <div className="sidebar">
            <div className="user-dropdown" onClick={handleUserMenu}>
                <img src={evernote_logo} id="user-image"/>
                <p id="main-username">{user.username}</p>
                <i className="fa-solid fa-angle-down" style={{fontSize: "10px"}}></i>
                {showUserMenu &&
                <div id="logout-div">
                    <p id="account">ACCOUNT</p>
                    <div className="username-block">
                        <i className="fa-solid fa-check" style={{color: 'skyblue'}}></i>
                        <img src={evernote_logo} className="user-image"/>
                        <div id="user-info">
                            <p className="user-name">{user.username}</p>
                            <p className='user-email'>{user.email}</p>
                        </div>
                    </div>
                    <LogoutButton />
                </div>}
            </div>


            <NavLink to="/home" className="navlink" activeClassName='sb-active'>
                <span className="home-button">
                    <i className="fa-solid fa-house"></i>
                    {` `}Home
                </span>
            </NavLink>
            <span className="dropdown-button" onClick={handleDropDown}>
                {!noteDropdown && <i className="fa-solid fa-caret-right"></i>}
                {noteDropdown && <i className="fa-solid fa-caret-down"></i>}
                {` `}<i className="fa-solid fa-book"></i>{` `}Notebooks
            </span>
            <>
                { noteDropdown && (
                <div className="notebook-dropdown">
                        {Object.values(notebooks).map(book =>
                            <NavLink to={`/${book.id}`} key={book.id} className="notebook-li" activeClassName='sb-active'>
                                {formatTitle(book.title)}
                            </NavLink>)}
                {/* {!Object.values(notebooks).length && <p className="notebook-li">Shelf is empty</p>} */}

                 <CreateNBModal user={user} />
                </div>)}
            </>
            <NavLink to="/trash" className="navlink" activeClassName='sb-active'>
                <span id="trash-link">
                    <i className="fa-solid fa-trash"></i>{` `}Trash
                </span>
            </NavLink>
            <div id="sidebar-padding">

            </div>
            <div className="sidebar-footer">

            </div>
        </div>
    </div>
  )
}
