import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { getAllNotebooks, editNotebook } from '../../store/notebooks'

import './NBModalStyle.css';


export default function EditNBModal({user, notebookId, allNbs, showModal, setShowModal }) {

    // const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);

    const [nbTitle, setNbTitle] = useState("");

    const dispatch = useDispatch();

     // dispatch edit notebooks
     const handleNotebookEdit = async (e) => {

        e.preventDefault();

        setErrors([]);

        const data = {
          userId: user.id,
          title: nbTitle
        };

        const editedNotebook = await(dispatch(editNotebook(data, notebookId)))

        if (Array.isArray(editedNotebook)) {
            setErrors(editedNotebook);
        } else {
            await dispatch(getAllNotebooks());
            setShowModal(false);
            setNbTitle("");
        }
    };

    const getNotebookDeets = () => {
            const desiredBook = Object.values(allNbs).filter(n => +n.id === +notebookId)[0]
            setNbTitle(desiredBook.title);
    }

    // set the NB title or w/e so it shows up preloaded
    useEffect(() => {
        getNotebookDeets();
    }, [allNbs])

    // get show an alert about length if at 60 chars
    useEffect(() => {
        if (nbTitle.length >= 60) {
            setErrors(["Maximum title length reached"]);
        }
    }, [nbTitle]);

    return (
        <>
        {/* <div onClick={() => setShowModal(true) } style={{cursor: "pointer"}}>Rename Notebook</div> */}
        {showModal && (
            <Modal onClose={() => {
                setShowModal(false)
            }}>

                <form className="modal-body update" onSubmit={handleNotebookEdit}>

                    <h3>Rename notebook</h3>
                    <div className="fields">
                        <label>Name</label>
                        <input
                            className="notebook-input"
                            type="text"
                            placeholder="Untitled"
                            value={nbTitle}
                            onChange={(e) => setNbTitle(e.target.value)}
                            maxLength={60}
                        />
                        <button type="Submit" style={{display:"none"}} />

                    </div>
                    <div className="errs">
                        {errors && errors.map((error, ind) => (
                        <div key={ind} className="error">{error}</div>
                    ))}
                    </div>
                    <div className="modal-buttons">
                        <button className="cancel-but" onClick={() => {
                            setShowModal(false)}}>Cancel</button>
                        <button type="Submit" className="green-button" onClick={handleNotebookEdit}>Continue</button>
                    </div>

                </form>

            </Modal>
        )}
        </>  )
}
