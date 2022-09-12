import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editScratch, getAllScratches } from '../../store/scratches';
import { authenticate } from '../../store/session';

import './Scratch.css';

export default function Scratch({ user }) {

    const scratchPad = user.scratch;

    // edit scratch content
    const [content, setContent] = useState("");

    // say if message is at limit
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        // initial dispatch to get scratch data
        dispatch(getAllScratches(user.id));
        dispatch(authenticate(user.id));
    }, [dispatch]);


    useEffect(() => {
        if (scratchPad && scratchPad.content) {
          setContent(scratchPad.content)
        }
    }, [scratchPad]);

    useEffect(() => {
        // update scratchPad content when it changes
        let payload = {
            content
        }
        dispatch(editScratch(payload, user.id));
        dispatch(getAllScratches(user.id));


        // also do alert about length if at 800 chars
        if (content) {
            if (content.length >= 800) {
                setMessage("Maximum length reached");
            } else {
                setMessage("");
            }
        }
    }, [dispatch, content])


  return (

    <div className= "scratch-area">
        <div className="scratch-title">
            <p>SCRATCH PAD</p>
        </div>
        <div className= "scratch-text-area">
            <textarea
                className="edit-scratch"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing..."
                rows={6}
                maxLength={800}
            />

        </div>
        <div className="errs">
            <p className="error">{message}</p>
        </div>
    </div>
  )
}
