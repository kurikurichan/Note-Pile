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
        console.log("scratchArr: ", scratchArr);
    }, [scratchPad]);

    // edit scratch content
    const [content, setContent] = useState("");
    //  toggle edit form for scratch content
    const [editContent, setEditContent] = useState(false);

    const dispatch = useDispatch();

    // load initial scratch content
    useEffect(() => {
        dispatch(getAllScratches(userId));
        // if the data isn't null then set it (since it comes from null from backend)
        if (scratchArr && scratchArr.content) setContent(scratchArr.content);
    }, [dispatch]);

    // handle when scratch content changes - save it
    const handleScratchChange = async (e) => {
        // update the local state content
        setContent(e.target.value);

        let payload = {
            content
        }

        if (content) {
            const updatedScratch = await dispatch(editScratch(payload, scratchArr?.id, userId));
            if (updatedScratch) console.log ("successfully edited");
        }
    };

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
                    onChange={handleScratchChange}
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
    </div>
  )
}