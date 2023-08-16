import CreateNBModal from "../Home/CreateNBModal";
import { NavLink } from "react-router-dom";

export default function DropdownMenu({ noteDropdown, notebooks, user }) {
  const formatTitle = (name) => {
    // cap the title at 15 chars to format for sidebar
    if (name.length > 15) {
      return name.slice(0, 15) + "...";
    }
    return name;
  };

  return (
    <div className={`notebook-dropdown${noteDropdown ? "-open" : ""}`}>
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
    </div>
  );
}
