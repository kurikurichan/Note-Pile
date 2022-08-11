import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { getAllNotebooks, editNotebook } from '../../store/notebooks'


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

                <form className="notebook-form" onSubmit={handleNotebookEdit}>
                    <label className="notebook-label">Name</label>
                        <input
                            className="notebook-input"
                            type="text"
                            placeholder="Untitled"
                            value={nbTitle}
                            onChange={(e) => setNbTitle(e.target.value)}
                        />
                        <button type="Submit">+</button>
                    <div className="errs">
                        {errors && errors.map((error, ind) => (
                        <div key={ind} className="error">{error}</div>
                    ))}
                    </div>
                </form>

            </Modal>
        )}
        </>  )
}
