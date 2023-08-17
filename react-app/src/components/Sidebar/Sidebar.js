import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllNotebooks } from "../../store/notebooks";

import Search from "./Search";

import pic from "./new_linkedin.png";

import "./Sidebar.css";
import DropdownMenu from "./DropdownMenu";
import UserDropdown from "./UserDropdown";

export default function Sidebar() {
  const user = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => state.notebooks);

  // for notebooks dropdown selection
  const [noteDropdown, setNoteDropdown] = useState(false);

  const handleDropDown = () => {
    setNoteDropdown(!noteDropdown);
  };

  // first test get notebooks
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotebooks());
  }, [dispatch]);

  if (!notebooks || !user) return <p className="loading">Loading...</p>;
  return (
    <div className="sidebar-wrap">
      <div className="sidebar">
        <UserDropdown user={user} />
        <Search userId={user.id} />
        <NavLink to="/home" className="navlink" activeClassName="sb-active">
          <span className="home-button">
            <i className="fa-solid fa-house" style={{ marginRight: "5px" }}></i>
            Home
          </span>
        </NavLink>
        <span className="dropdown-button" onClick={handleDropDown}>
          <i
            className={`fa-solid fa-caret-${noteDropdown ? "right" : "down"}`}
            style={{ marginRight: "5px" }}
          ></i>
          <i className="fa-solid fa-book" style={{ marginRight: "5px" }}></i>
          Notebooks
        </span>
        <DropdownMenu
          noteDropdown={noteDropdown}
          notebooks={notebooks}
          user={user}
        />
        <NavLink
          to="/trash/all"
          className="navlink"
          activeClassName="sb-active"
        >
          <span id="trash-link">
            <i className="fa-solid fa-trash" style={{ marginRight: "5px" }}></i>
            Trash
          </span>
        </NavLink>
        <div className="sidebar-footer"></div>
      </div>
      <div className="social-container">
        <div className="socials">
          <p>⚡️ Hire Krista! ⚡️</p>
          <a
            href="https://krista.red/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={pic} id="pic" alt="nice pic of krista" />
          </a>
          <div id="sb-links">
            <a
              href="https://github.com/kurikurichan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/krista-strucke"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="mailto:developerkrista@gmail.com">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
