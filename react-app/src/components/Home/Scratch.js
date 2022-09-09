import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editScratch, getAllScratches } from '../../store/scratches';

import './Scratch.css';

export default function Scratch({ userId }) {

    const scratchPad = useSelector(state => state.scratches);

    // Object.values(state.scratches)[0]

    let scratchArr;

    if (scratchPad) scratchArr = Object.values(scratchPad)[0];

    // edit scratch content
    const [content, setContent] = useState(scratchArr?.content);

    // say if message is at limit
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        // initial dispatch to get scratch data
        dispatch(getAllScratches(userId));
        console.log("iniital scratch dispatch")
    }, dispatch);

    useEffect(() => {
        if (scratchArr) {
            console.log("setContent scratchArr.cont || '' ");
          setContent(scratchArr.content || " ")
          console.log("content: ", content)
        }
    }, [scratchPad, content]);


    const handleChange = (e) => {

        setContent(e.target.value);

        let payload = {
            content
        }
        console.log("edit dispatch");
        dispatch(editScratch(payload, userId));

        // also do alert about length if at 800 chars
        if (content) {
            if (content.length >= 800) {
                setMessage("Maximum length reached");
            } else {
                setMessage("");
            }
        }
    }

    // get initial scratch
    // useEffect(() => {
    //     console.log("scratxchPad useEffect rendered");
    //     // if the data isn't null then set it (since it comes from null from backend)
    //     if (scratchArr && scratchArr.content) {
    //         console.log("scratchPad useeffect  content is set")
    //         setContent(scratchArr.content);

    //     }
    // }, [scratchArr]);

  return (

    <div className= "scratch-area">
        <div className="scratch-title">
            <p>SCRATCH PAD</p>
        </div>
        <div className= "scratch-text-area">
            {scratchArr && scratchArr.content &&
                <textarea
                    className="edit-scratch"
                    value={content}
                    onChange={handleChange}
                    placeholder="Start writing..."
                    rows={6}
                    maxLength={800}
                />
            }
        </div>
        <div className="errs">
            <p className="error">{message}</p>
        </div>
    </div>
  )
}
