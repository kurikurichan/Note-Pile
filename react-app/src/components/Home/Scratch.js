import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editScratch } from '../../store/session';

import './Scratch.css';

export default function Scratch({ user }) {

    // const scratchPad = user.scratch;
    const scratchPad = user.scratch;
    
    // edit scratch content
    const [content, setContent] = useState(scratchPad || "");

    // say if message is at limit
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();


    useEffect(() => {
        // update scratchPad content when it changes
        let payload = {
            scratch: content
        }
        dispatch(editScratch(payload, user.id));

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
            <div className="errs">
                <p className="error" style={{color: "red"}}>{message}</p>
            </div>
        </div>
    </div>
  )
}
