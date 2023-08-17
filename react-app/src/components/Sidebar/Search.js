import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEverySinglePage } from "../../store/all_pages";

import "./Search.css";

export default function Search({ userId }) {
  const data = useSelector((state) => Object.values(state.all_pages));

  // search text
  const [searchText, setSearchText] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  // show big search box when clicked
  const [doSearch, setDoSearch] = useState(false);

  const dispatch = useDispatch();

  // dispatch for the page data
  useEffect(() => {
    dispatch(getEverySinglePage(userId));
  }, [dispatch, userId]);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setSearchText(searchWord);
    // demonstrates filtering thru data
    const newFilter = data.filter((result) => {
      return (
        result.title &&
        result.title.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleClear = (e) => {
    setSearchText("");
    setFilteredData([]);
    setDoSearch(false);
  };

  const handleBlur = (e) => {
    //  basically we can blur out *if* nothing is in our search results.
    // this is to prevent accidental clicking out of search data
    if (searchText.length === 0) setDoSearch(false);
  };

  return (
    <div className="search">
      {doSearch ? (
        <div className="active-search-wrapper">
          <div id="active-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <>
              <input
                autoFocus
                autoComplete="off"
                id="active-search-input"
                placeholder="Search page titles"
                type="text"
                value={searchText}
                onChange={handleFilter}
                onBlur={handleBlur}
              />

              <div>
                {searchText.length > 0 && (
                  <i className="fa-solid fa-x" onClick={handleClear}></i>
                )}
              </div>
            </>
          </div>

          {filteredData.length > 0 && (
            <div className="data-result">
              {data &&
                filteredData.slice(0, 15).map((pg) => (
                  <Link
                    to={`/${pg.notebookId}/${pg.id}`}
                    className="data-item"
                    key={pg.id}
                    onClick={() => setDoSearch(false)}
                  >
                    <i className="fa-solid fa-book-open"></i>
                    <p>{pg.title}</p>
                  </Link>
                ))}
            </div>
          )}

          {filteredData.length === 0 && searchText.length > 0 && (
            <div className="data-result">
              <p id="no-results">No results found</p>
            </div>
          )}
        </div>
      ) : (
        <div id="unactive-search" onClick={() => setDoSearch(true)}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            placeholder="Search page titles"
            className="unactive-search-input"
          />
        </div>
      )}
    </div>
  );
}
