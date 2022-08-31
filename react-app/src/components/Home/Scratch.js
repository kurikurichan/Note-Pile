import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editScratch, getAllScratches } from '../../store/scratches';

import './Scratch.css';

export default function Scratch({ userId }) {

    const scratchPad = useSelector(state => state.scratches);

    console.log(scratchPad);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllScratches(userId));
    }, [dispatch]);


  return (

    <div className= "scratch-area">
        <div className="scratch-title">
            <p>SCRATCH PAD</p>
        </div>
        <div className= "scratch-text-area">
            {scratchPad &&
            <p>
                {scratchPad.content ? scratchPad.content : "Start writing..."}
            </p>}
        </div>
    </div>
  )
}
