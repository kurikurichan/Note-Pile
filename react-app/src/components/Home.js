import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllNotebooks, newNotebook, editNotebook, deleteNotebook } from '../store/notebooks';

export default function Home() {

    const user = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);

    // for notebooks dropdown selection
    const [noteDropdown, setNoteDropdown] = useState(false);

    const openDropdown = () => {
        if (noteDropdown) return;
        setNoteDropdown(true);
      };

      useEffect(() => {
        if (!noteDropdown) return;

        const closeDropdown = () => {
          setNoteDropdown(false);
        };

        document.addEventListener('click', closeDropdown);

        return () => document.removeEventListener("click", closeDropdown);
      }, [noteDropdown]);

    // test CRUDS!
    // notebooks
    // first test get notebooks
    const dispatch = useDispatch();

    const getNotebooks = async () => {
        await dispatch(getAllNotebooks());
    }

    useEffect(() => {
      getNotebooks();
    }, [dispatch])

    if (!notebooks || !user) return <p className="loading">Loading...</p>
  return (
    <div>
        <span onClick={openDropdown}>
            {!noteDropdown && <i className="fa-solid fa-caret-right"></i>}
            {noteDropdown && <i className="fa-solid fa-caret-down"></i>}
            {` `}Notebooks
        </span>
        { noteDropdown && (
            <ul className="notebook-dropdown">
                {Object.values(notebooks).map(book =>
                <li key={book.id}>{book.title}</li>)}
            </ul>
        )}
    </div>
  )
}
