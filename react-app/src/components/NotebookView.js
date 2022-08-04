import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getAllNotebooks } from '../store/notebooks'

export default function NotebookView() {
    // this is the component where we can see the list of pages and individual pages of a notebook
    const { notebookId } = useParams();
    // TODO:
    // test update notebook title
    // have drop down with: "add new note" "rename notebook (edit)" "delete notebook"
  return (
    <div>NotebookView</div>
  )
}
