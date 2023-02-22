import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { deletePage } from '../../store/pages';

import '../MainPageView/NBModalStyle.css';

export default function PermanentlyDeletePage({ user, pageId, getTheTrash }) {

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    // for dispatching delete notebook
    const handleDeletePage = async (e) => {

        e.preventDefault();
        // delete single page
        try {
            await dispatch(deletePage(user.id, pageId));
        } catch(e) {
            console.log(e);
        }

        getTheTrash();

    }


    return (
        <>
            <button className="trash-button delete-but" onClick={() => setShowModal(true)}>
                <i className="fa-solid fa-trash-can"></i>
            </button>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>

                    <div className="modal-body delete">
                        <h2>Delete This Page?</h2>
                        <p>Are you sure you want to permanently delete this page?</p>
                        <div className="modal-buttons">
                            <button className="cancel-but" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="delete-but" onClick={handleDeletePage}>Delete</button>
                        </div>
                    </div>

                </Modal>
            )}
        </>  )
}
