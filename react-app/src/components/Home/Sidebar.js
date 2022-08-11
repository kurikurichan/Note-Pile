import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getAllNotebooks } from '../../store/notebooks';
import LogoutButton from '../auth/LogoutButton';
import CreateNBModal from './CreateNBModal';

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

    useEffect(() => {
        dispatch(getAllNotebooks());
    }, [dispatch])

    if (!notebooks || !user) return <p className="loading">Loading...</p>
  return (
    <div className="sidebar">
        <div id="drop-container">
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
        </div>

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


                <CreateNBModal user={user} />

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
