import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { getAllNotebooks, newNotebook } from '../../store/notebooks'

import '../MainPageView/NBModalStyle.css';

export default function CreateNBModal({ user }) {

    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);

    const [title, setTitle] = useState("");

    const dispatch = useDispatch();

    const handleNotebookSubmit = async (e) => {

        e.preventDefault();

        setErrors([]);

        const data = {
          userId: user.id,
          title
        };

        const postNotebook = await(dispatch(newNotebook(data)))

        if (Array.isArray(postNotebook)) {
            setErrors(postNotebook);
        } else {
            await dispatch(getAllNotebooks());
            setTitle("");
        }

    };

  return (
    <>
        <li onClick={() => setShowModal(true)} id="new-notebook">
            <i className="fa-solid fa-book-medical"></i>
            {` `}New Notebook
        </li>

        {showModal && (
            <Modal onClose={() => setShowModal(false)}>

                <form className="modal-body" onSubmit={handleNotebookSubmit}>

                    <h3>Create new notebook</h3>
                    <p>Notebooks are useful for grouping notes around a common topic.</p>
                    <div className="fields">
                        <label>Name</label>
                        <input
                            className="notebook-input"
                            type="text"
                            placeholder="Notebook name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    {errors &&
                    <div className="errs">
                        {errors && errors.map((error, ind) => (
                        <div key={ind} className="error">{error}</div>
                    ))}
                    </div>}
                    <div className="modal-buttons">
                        <button className="cancel-but" onClick={() => setShowModal(false)}>Cancel</button>
                        <button type="Submit" className="green-button" onClick={handleNotebookSubmit}>Create</button>
                    </div>

                </form>

            </Modal>
        )}
    </>
  )
}
