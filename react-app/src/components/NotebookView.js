import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getAllNotebooks, editNotebook } from '../store/notebooks'

export default function NotebookView() {
    // this is the component where we can see the list of pages and individual pages of a notebook
    const { notebookId } = useParams();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const allNotebooks = useSelector(state => state.notebooks)

    const [showMenu, setShowMenu] = useState(false);
    const [showEditBox, setShowEditBox] = useState(false);
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");

    // This is all for the notebooks drop down menu (for edit & delete)
    const openMenu = () => {
      setShowMenu(!showMenu)
    };


    // For dropdown menu, editing notebooks
    const handleRenameNotebook = () => {
        setShowEditBox(!showEditBox)
    };

    // dispatch edit notebooks
    const handleNotebookEdit = async (e) => {

        e.preventDefault();

        setErrors([]);

        const data = {
          userId: user.id,
          title
        };

        const editedNotebook = await(dispatch(editNotebook(data, notebookId)))

        console.log("edit notebook", editedNotebook);

        if (Array.isArray(editedNotebook)) {
            setErrors(editedNotebook);
        } else {
            console.log("edited notebook success")
            getNotebooks();
            setTitle("");
        }
    };

    // for dispatching delete notebook
    const handleNotebookDelete = (e) => {
        //hmm
    };


    if (allNotebooks) {
        const currentNotebook = Object.values(allNotebooks).filter(book => book.id == notebookId)[0];
    }

    const getNotebooks = async () => {
        await dispatch(getAllNotebooks(user.id));
    };

    useEffect(() => {
      getNotebooks();
    }, [dispatch])

    // TODO:
    // test update notebook title
    // have drop down with: "add new note" "rename notebook (edit)" "delete notebook"
  return (
    <div>
        <div className="notebook-options-dropdown" onClick={openMenu}>
            <i className="fa-solid fa-ellipsis"></i>
        </div>
        {showMenu &&
            <div className="profile-dropdown">
                <div>New Page</div>
                <div onClick={handleRenameNotebook}>Rename Notebook</div>
                {showEditBox &&
                    <form className="notebook-form" onSubmit={handleNotebookEdit}>
                        <label className="notebook-label">
                            <button onClick={(e) => setShowEditBox(false)}>x</button>
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
                    </form> }
                <div onClick={handleNotebookDelete}>Delete Notebook</div>
            </div>}
    </div>
  )
}
