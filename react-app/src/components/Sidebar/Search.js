import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getEverySinglePage } from '../../store/pages';

import "./Search.css";

export default function Search() {

    // search text
    const [searchText, setSearchText] = useState("");

    // search results
    const [searchResults, setSearchResults] = useState([]);



    const dispatch = useDispatch();

  return (
    <form id="search">
        <>
          <input
              autoComplete='off'
              id="search-input"
              placeholder="Search"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
          />

          <div id="search-results">

          </div>
        </>

    </form>
  )
}
