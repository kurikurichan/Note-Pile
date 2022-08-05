import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllNotebooks, newNotebook } from '../../store/notebooks';

export default function Home() {

    const user = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks);

    // for notebooks dropdown selection
    const [noteDropdown, setNoteDropdown] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    // errors for notebook submit
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");


    const handleNotebookSubmit = async (e) => {

        e.preventDefault();

        setErrors([]);

        const data = {
          userId: user.id,
          title
        };

        const postNotebook = await(dispatch(newNotebook(data)))

        console.log("post notebook", postNotebook);

        if (Array.isArray(postNotebook)) {
            setErrors(postNotebook);
        } else {
            console.log("new notebook success")
            getNotebooks();
            setTitle("");
        }

    };

    const handleDropDown = () => {
        setNoteDropdown(!noteDropdown);
        if (!noteDropdown) {
            setShowEdit(false);
            setErrors([]);
        }
    }

    const handleShowEdit = () => {
        setShowEdit(!showEdit);
    }

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
    <div className="notebook-dropdown-view">
        <span onClick={handleDropDown}>
            {!noteDropdown && <i className="fa-solid fa-caret-right"></i>}
            {noteDropdown && <i className="fa-solid fa-caret-down"></i>}
            {` `}<i className="fa-solid fa-book"></i>{` `}Notebooks
        </span>
        { noteDropdown && (
            <ul className="notebook-dropdown">
                {Object.values(notebooks).map(book =>
                    <li key={book.id}>
                        <Link to={`/${book.id}`}>{book.title}</Link>
                    </li>)}

                { showEdit && (
                <div className="form-holder">
                    <form className="notebook-form" onSubmit={handleNotebookSubmit}>
                        <label className="notebook-label">
                            <button onClick={(e) => setShowEdit(false)}>x</button>
                            <input
                                className="notebook-input"
                                type="text"
                                placeholder="Untitled"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <button type="Submit">+</button>
                        </label>
                        <div className="errs">
                            {errors && errors.map((error, ind) => (
                            <div key={ind} className="error">{error}</div>
                        ))}
                        </div>
                    </form>
                </div>)}

                { !showEdit && (
                <li onClick={handleShowEdit}>
                    <i className="fa-solid fa-book-medical"></i>
                    {` `}New Notebook
                </li>)
                }

            </ul>
        )}
        <span id="trash-link">
            {` `}<Link to="/trash"><i className="fa-solid fa-trash"></i></Link>{` `}
            Trash
        </span>

    </div>
  )
}
