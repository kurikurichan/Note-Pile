import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getEverySinglePage } from '../../store/all_pages';

import "./Search.css";

export default function Search({ userId }) {

  const data = useSelector(state => Object.values(state.all_pages));

  // search text
  const [searchText, setSearchText] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  // show big search box when clicked
  const [doSearch, setDoSearch] = useState(false);

  // for dealing with search menu later
  const searchRef = useRef();

  const dispatch = useDispatch();

  // dispatch for the page data
  useEffect(() => {
    dispatch(getEverySinglePage(userId));
  }, [dispatch]);


  const returnProperLocation = (nbId, pId) => {
    return {
      pathname: `/${nbId}`,
      state: { pageId: pId }
    }
  }

    const handleFilter = (e) => {
      const searchWord = e.target.value;
      setSearchText(searchWord);
      // demonstrates filtering thru data
      const newFilter = data.filter(result => {
        return result.title && result.title.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }

    }

    const handleClear = (e) => {
      setSearchText("");
      setFilteredData([]);
    }



  return (
    <div className="search">
      <div className="search-inputs">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          autoComplete='off'
          id="active-search-input"
          placeholder="Search page titles"
          type="text"
          value={searchText}
          onChange={handleFilter}
        />
        <div>{searchText.length > 0 && <i className="fa-solid fa-x" onClick={handleClear}></i>}</div>
      </div>

      {filteredData.length > 0 &&
        <div className="data-result">
          {data && filteredData.slice(0, 15).map(pg =>
            <Link to={returnProperLocation(pg.notebookId, pg.id)} className="data-item" key={pg.id}>
              <i className="fa-solid fa-book-open"></i>
              <p className="data-item">{pg.title}</p>
            </Link>)}

        </div>
      }

    </div>
  )
}
