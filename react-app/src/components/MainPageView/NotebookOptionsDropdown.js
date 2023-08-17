import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import EditNBModal from "./EditNBModal";
import DeleteNBModal from "./DeleteNBModal";

export default function NotebookOptionsDropdown({
  showMenu,
  setShowMenu,
  handleNewPage,
  user,
  notebookId,
  allNotebooks,
}) {
  // modal popups in dropdown menu
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const catMenu = useRef(null);

  // open the menu I guess
  const handleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

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
    document.addEventListener("mousedown", closeMenu);

    return () => {
      // clean up event listener
      document.removeEventListener("mousedown", closeMenu);
    };
  }, [catMenu, showMenu, setShowMenu]);

  return (
    <div className="notebook-options-dropdown">
      <i
        className="fa-solid fa-ellipsis"
        onClick={handleMenu}
        ref={catMenu}
      ></i>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="profile-dropdown"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, transition: { delay: 0.05 } }}
            transition={{ type: "spring", duration: 0.2, ease: "easeInOut" }}
          >
            <div onClick={handleNewPage} style={{ cursor: "pointer" }}>
              Add a Page
            </div>
            <div
              onClick={() => setShowEdit(true)}
              style={{ cursor: "pointer" }}
            >
              Rename Notebook
            </div>
            <div
              onClick={() => setShowDelete(true)}
              style={{ cursor: "pointer" }}
            >
              Delete Notebook
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <>
        {showEdit && (
          <EditNBModal
            user={user}
            notebookId={notebookId}
            allNbs={allNotebooks}
            showModal={showEdit}
            setShowModal={setShowEdit}
          />
        )}
        {showDelete && (
          <DeleteNBModal
            notebookId={notebookId}
            showModal={showDelete}
            setShowModal={setShowDelete}
          />
        )}
      </>
    </div>
  );
}
