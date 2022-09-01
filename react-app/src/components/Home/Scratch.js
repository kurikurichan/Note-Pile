import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editScratch, getAllScratches } from '../../store/scratches';

import './Scratch.css';

export default function Scratch({ userId }) {

    const scratchPad = useSelector(state => state.scratches);

    let scratchArr;

    // make scratchPad an array for ez access
    useEffect(() => {
        scratchArr = Object.values(scratchPad)[0];
        console.log("scratchArr useEffect", scratchArr);
    }, [scratchPad]);

    // edit scratch content
    const [content, setContent] = useState(scratchArr?.content || "");
    //  toggle edit form for scratch content
    const [editContent, setEditContent] = useState(false);
    // say if message is at limit
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        // initial dispatch
        dispatch(getAllScratches(userId));
    }, dispatch);

    // grab initial content, update scratch content
    useEffect(() => {

        let payload = {
            content
        }

        if (content) {
            dispatch(editScratch(payload, userId));

        // also do alert about length if at 800 chars
        if (scratchArr) {
            if (scratchArr.content.length >= 800) {
                setMessage("Maximum length reached");
            } else {
                setMessage("");
            }
        }
        }
    }, [dispatch, content]);

    // get initial scratch
    useEffect(() => {
        // if the data isn't null then set it (since it comes from null from backend)
        if (scratchArr && scratchArr.content) setContent(scratchArr.content);
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
