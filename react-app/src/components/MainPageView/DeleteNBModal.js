import React from 'react';
import { useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { deleteNotebook } from '../../store/notebooks';
import { useHistory } from 'react-router-dom';

import './NBModalStyle.css';

export default function DeleteNBModal({ notebookId, showModal, setShowModal }) {

    // const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    // for dispatching delete notebook
    const handleNotebookDelete = async (e) => {

        e.preventDefault(e);

        const deleted = await dispatch(deleteNotebook(notebookId));

        if (deleted) {
            setShowModal(false);
            history.push(`/home`);
        }
    };


    return (
        <>
            {/* <div onClick={() => setShowModal(true)} style={{cursor: "pointer"}}>Delete Notebook</div> */}

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>

                    <div className="modal-body delete">
                        <h2>Delete notebook?</h2>
                        <p>Any notes in the notebook will be permanently deleted. This cannot be undone.</p>
                        <div className="modal-buttons">
                            <button className="cancel-but" onClick={() => {
                                setShowModal(false)}}>Cancel</button>
                            <button className="delete-but" onClick={handleNotebookDelete}>Delete</button>
                        </div>
                    </div>

                </Modal>
            )}
        </>  )
}
