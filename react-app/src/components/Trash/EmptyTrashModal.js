import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Modal } from '../../context/Modal';
import { deletePage } from '../../store/pages';

import '../MainPageView/NBModalStyle.css';

export default function EmptyTrash({ user, allTrashedPages, getTheTrash }) {

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    // for dispatching delete notebook
    const handleEmptyTrash = async (e) => {

        e.preventDefault();
        // loop thru trash and delete each page in it
        try {
            for (let page of Object.values(allTrashedPages)) {
                await dispatch(deletePage(user.id, page.id));
            }
        } catch(e) {
            console.log(e);
        }

        getTheTrash();

    }


    return (
        <>
            <button className="green-button" onClick={() => setShowModal(true)}>Empty Trash</button>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>

                    <div className="modal-body delete">
                        <h2>Empty Trash?</h2>
                        <p>Are you sure you want to empty the trash? All items in the trash will be permanently deleted and cannot be restored.</p>
                        <div className="modal-buttons">
                            <button className="cancel-but" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="delete-but" onClick={handleEmptyTrash}>Delete</button>
                        </div>
                    </div>

                </Modal>
            )}
        </>  )
}
