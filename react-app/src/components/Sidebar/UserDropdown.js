import React, { useEffect } from "react";
import LogoutButton from "../auth/LogoutButton";
import evernote_logo from "./evernote_logo.png";

export default function UserDropdown({
  catMenu,
  handleUserMenu,
  showUserMenu,
  setShowUserMenu,
  user,
}) {
  // Close the user dropdown menu when it is clicked outside of
  useEffect(() => {
    const closeMenu = (e) => {
      if (
        catMenu.current &&
        showUserMenu &&
        !catMenu.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }
    };

    // event listener for when mouse is down anywhere in document
    document.addEventListener("mouseup", closeMenu);

    return () => {
      // clean up event listener
      document.removeEventListener("mouseup", closeMenu);
    };
  }, [catMenu, showUserMenu, setShowUserMenu]);
  return (
    <div className="user-dropdown" onClick={handleUserMenu}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={evernote_logo} alt="user" id="user-image" />
        <p id="main-username">{user.username}</p>
        <i className="fa-solid fa-angle-down" style={{ fontSize: "10px", marginLeft: "2px" }}></i>
      </div>
      {showUserMenu && (
        <div id="logout-div" ref={catMenu}>
          <p id="account">ACCOUNT</p>
          <div className="username-block">
            <i
              className="fa-solid fa-check"
              style={{ color: "skyblue", padding: "0 5px 0 5px" }}
            ></i>
            <img src={evernote_logo} alt="logo" className="user-image" />
            <div id="user-info">
              <p className="user-name">{user.username}</p>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
