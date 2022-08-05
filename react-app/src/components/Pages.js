import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPages } from '../store/pages';

export default function Pages({ notebookId, userId, pageId }) {

    const allPagesOfNotebook = useSelector(state => state.pages)

    // if (allPagesOfNotebook) console.log("All pages: ", allPagesOfNotebook)

    // single notebook based on notebookId
    let currentPage;

    if (allPagesOfNotebook) {
        currentPage = Object.values(allPagesOfNotebook).filter(page => page.id == pageId)[0];
    }

    console.log("current page", currentPage);

    const dispatch = useDispatch();

    const getPages = async () => {
        await dispatch(getAllPages(userId, notebookId));
    };

    useEffect(() => {
        dispatch(getAllPages(userId, notebookId));
    }, [dispatch])

    // update view whenever pageId changes

  return (
    <div className="pages-view">
        {/* {Object.values(allPagesOfNotebook).map(page =>
            <div key={page.id}>
                {page.title}
            </div>)} */}
    </div>
  )
}
