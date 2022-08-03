const GET_ALL_PAGES = "pages/GET_ALL_PAGES";
const DELETE_PAGE = "pages/DELETE_PAGE";
const CREATE_PAGE = "pages/CREATE_PAGE";
const UPDATE_PAGE = "pages/UPDATE_PAGE";


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

export const getAllPages = () => async (dispatch) => {

    const res = await fetch(`/api/pages/`);

    if (res.ok) {

      const data = await res.json();
      dispatch(getPages(data));
      return data;

    }
}

export const newPage = (page) => async (dispatch) => {

    const res = await fetch("/api/pages/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(page),
    });

    if (res.ok) {
      const data = await res.json;

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

    const res = await fetch(`/api/pages/${userId}/${pageId}`, {
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
      case GET_ALL_PAGES:
        action.pages.forEach((page) => {
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