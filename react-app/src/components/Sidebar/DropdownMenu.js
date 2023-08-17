import CreateNBModal from "../Home/CreateNBModal";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";

export default function DropdownMenu({ noteDropdown, notebooks, user }) {
  const formatTitle = (name) => {
    // cap the title at 15 chars to format for sidebar
    if (name.length > 15) {
      return name.slice(0, 15) + "...";
    }
    return name;
  };

  return (
    <>
      {noteDropdown && (
        <AnimatePresence>
          <motion.div
            className="notebook-dropdown"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -10, transition: { delay: 0.05 } }}
            transition={{ type: "spring", duration: 0.2, ease: "easeInOut" }}
          >
            {Object.values(notebooks).map((book) => (
              <NavLink
                to={`/${book.id}/recent`}
                key={book.id}
                className="notebook-li"
                activeClassName="sb-active"
              >
                {formatTitle(book.title)}
              </NavLink>
            ))}
            {/* {!Object.values(notebooks).length && <p className="notebook-li">Shelf is empty</p>} */}

            <CreateNBModal user={user} />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
