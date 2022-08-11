const GET_EVERY_PAGE = "pages/GET_EVERY_PAGE";
const GET_ALL_PAGES = "pages/GET_ALL_PAGES";
const DELETE_PAGE = "pages/DELETE_PAGE";
const CREATE_PAGE = "pages/CREATE_PAGE";
const UPDATE_PAGE = "pages/UPDATE_PAGE";

const GET_ALL_TRASH = "pages/GET_ALL_TRASH";
const ADD_TO_TRASH = "pages/ADD_TO_TRASH";

// get like EVERY PAGE regardless of notebook. for search functions
const getEveryPage = (pages) => {
  return {
    type: GET_EVERY_PAGE,
    pages
  }
}

const getPages = (pages) => {
    return {
        type: GET_ALL_PAGES,
        pages
    };
};

const createPage = (page) => {
    return {
        type: CREATE_PAGE,
        page
    };
};

const updatePage = (page) => {
    return {
        type: UPDATE_PAGE,
        page
    };
};

const delPage = (page) => {
    return {
        type: DELETE_PAGE,
        page
    };
};

const getTrash = (trash) => {
    return {
        type: GET_ALL_TRASH,
        trash
    }
}

const updateTrash = (trash) => {
    return {
        type: ADD_TO_TRASH,
        trash
    }
}

export const getAllTrash = (userId) => async (dispatch) => {

    const res = await fetch(`/api/pages/${userId}/trash/`);

    if (res.ok) {

      const data = await res.json();
      dispatch(getTrash(data));
      return data;

    }
}

export const addToTrash = (trashedItem, pageId) => async (dispatch) => {
     // note: this has been edited to now change trash statuses. can be false or true

    const res = await fetch(`/api/pages/trash/${pageId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trashedItem),
    });

    if (res.ok) {

      const data = await res.json();
      dispatch(updateTrash(data));
      return data;

    }
}

export const getEverySinglePage = (userId) => async (dispatch) => {

  const res = await fetch(`/api/pages/${userId}/`);

  if (res.ok) {

    const data = await res.json();
    dispatch(getEveryPage(data));
    return data;

  }
}


export const getAllPages = (userId, notebookId) => async (dispatch) => {

    const res = await fetch(`/api/pages/${userId}/${notebookId}/`);

    if (res.ok) {

      const data = await res.json();
      dispatch(getPages(data));
      return data;

    }
}

export const newPage = (page, notebookId) => async (dispatch) => {

    const res = await fetch(`/api/pages/${notebookId}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(page),
    });

    if (res.ok) {
      const data = await res.json();

      dispatch(createPage(data));
      return data;
    }
};


export const editPage = (pageData, pageId) => async (dispatch) => {
    const res = await fetch(`/api/pages/${pageId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pageData),
    });

    const data = await res.json();
    dispatch(updatePage(data));
};

export const deletePage = (userId, pageId) => async (dispatch) => {

    const res = await fetch(`/api/pages/${userId}/${pageId}/`, {
        method: "DELETE"
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(delPage(data));
      }

}

const pages = (state = {}, action) => {
    let newState = {};
    switch (action.type) {

      case GET_EVERY_PAGE:
        action.pages.all_pages.forEach((page) => {
          newState[page.id] = page;
        });
        return newState;

      case GET_ALL_TRASH:
        action.trash.trash.forEach((page) => {
            newState[page.id] = page;
        });
        return newState;

      case ADD_TO_TRASH:
        newState = { ...state, [action.trash.id]: action.trash };
        return newState;

      case GET_ALL_PAGES:
        action.pages.pages.forEach((page) => {
          newState[page.id] = page;
        });
        return newState;

      case CREATE_PAGE:
        newState[action.page.id] = action.page;
        return newState;

      case UPDATE_PAGE:
        newState = { ...state, [action.page.id]: action.page };
        return newState;

      case DELETE_PAGE:
        newState = { ...state };
        delete newState[action.page];
        return newState;

      default:
        return state;
    }
};

export default pages;


//TODO:
// add trash stuff to this file and test it
// need trash seeder data
