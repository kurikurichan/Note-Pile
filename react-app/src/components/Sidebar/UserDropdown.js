import React, { useEffect, useState, useRef } from "react";
import LogoutButton from "../auth/LogoutButton";
import evernote_logo from "./evernote_logo.png";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

export default function UserDropdown({ user }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const catMenu = useRef(null);

  const handleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

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
    <div
      className="user-dropdown"
      onClick={handleUserMenu}
      style={{ backgroundColor: "pink" }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={evernote_logo} alt="user" id="user-image" />
        <p id="main-username">{user.username}</p>
        <i
          className="fa-solid fa-angle-down"
          style={{ fontSize: "10px", marginLeft: "2px" }}
        ></i>
      </div>
      <AnimatePresence>
        {showUserMenu && (
          <motion.div
            id="logout-div"
            ref={catMenu}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -10, transition: { delay: 0.05 } }}
            transition={{ type: "spring", duration: 0.2, ease: "easeInOut" }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
