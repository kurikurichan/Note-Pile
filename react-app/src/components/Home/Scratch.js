import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editScratch, getAllScratches } from '../../store/scratches';

import './Scratch.css';

export default function Scratch({ userId }) {

    // note: change the way we make this an object later so useEffect stops complaining
    const scratchPad = useSelector(state => Object.values(state.scratches)[0]);

    // edit scratch content
    const [content, setContent] = useState(scratchPad?.content || "");
    //  toggle edit form for scratch content
    const [editContent, setEditContent] = useState(false);
    // say if message is at limit
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        // initial dispatch to get scratch data
        dispatch(getAllScratches(userId));
    }, dispatch);

    // grab initial content, update scratch content
    useEffect(() => {

        let payload = {
            content
        }

        dispatch(editScratch(payload, userId));

        // also do alert about length if at 800 chars
        if (scratchPad) {
            if (scratchPad.content.length >= 800) {
                setMessage("Maximum length reached");
            } else {
                setMessage("");
            }
        }
    }, [content]);

    // get initial scratch
    useEffect(() => {
        // if the data isn't null then set it (since it comes from null from backend)
        if (scratchPad && scratchPad.content) setContent(scratchPad.content);
    }, [scratchPad]);

    if (!scratchPad) return null;
  return (

    <div className= "scratch-area">
        <div className="scratch-title">
            <p>SCRATCH PAD</p>
        </div>
        <div className= "scratch-text-area">
            {editContent ? (
                <textarea
                    className="edit-scratch"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing..."
                    rows={6}
                    maxLength={800}
                />
            ):(
                <p placeholder='Start writing...' onClick={setEditContent(true)}>
                    {content ? content : "Start writing..."}
                </p>
            )}
        </div>
        <div className="errs">
            <p className="error">{message}</p>
        </div>
    </div>
  )
}
