import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { getAllNotebooks, editNotebook } from '../../store/notebooks'

import './NBModalStyle.css';


export default function EditNBModal({user, notebookId}) {

    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);

    const [nbTitle, setNbTitle] = useState("");

    const dispatch = useDispatch();




     // dispatch edit notebooks
     const handleNotebookEdit = async (e) => {

        e.preventDefault();

        setErrors([]);

        const data = {
          userId: user.id,
          nbTitle
        };

        const editedNotebook = await(dispatch(editNotebook(data, notebookId)))

        if (Array.isArray(editedNotebook)) {
            setErrors(editedNotebook);
        } else {
            await dispatch(getAllNotebooks());
            setNbTitle("");
        }
    };

    return (
        <>
        <div onClick={() => setShowModal(true)}>Rename Notebook</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>

                <form className="modal-body" onSubmit={handleNotebookEdit}>

                    <h3>Rename notebook</h3>
                    <label>Name</label>
                        <input
                            className="notebook-input"
                            type="text"
                            placeholder="Untitled"
                            value={nbTitle}
                            onChange={(e) => setNbTitle(e.target.value)}
                        />
                    <div className="errs">
                        {errors && errors.map((error, ind) => (
                        <div key={ind} className="error">{error}</div>
                    ))}
                    </div>
                    <div className="modal-buttons">
                        <button className="cancel-but" onClick={() => setShowModal(false)}>Cancel</button>
                        <button type="Submit" className="green-button" onClick={handleNotebookEdit}>Continue</button>
                    </div>

                </form>

            </Modal>
        )}
        </>  )
}
