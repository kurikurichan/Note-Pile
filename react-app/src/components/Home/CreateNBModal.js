import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { getAllNotebooks, newNotebook } from '../../store/notebooks'

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

        <div className="form-holder">
            <form className="notebook-form" onSubmit={handleNotebookSubmit}>
                <label className="notebook-label">Name</label>
                    <input
                        className="notebook-input"
                        type="text"
                        placeholder="Untitled"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button type="Submit">+</button>
                <div className="errs">
                    {errors && errors.map((error, ind) => (
                    <div key={ind} className="error">{error}</div>
                ))}
                </div>
            </form>
        </div>

            </Modal>
        )}
    </>
  )
}
