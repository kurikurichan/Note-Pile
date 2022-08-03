const GET_ALL_PAGES = "notebooks/GET_ALL_PAGES";
const DELETE_PAGE = "notebooks/DELETE_PAGE";
const CREATE_PAGE = "notebooks/CREATE_PAGE";
const UPDATE_PAGE = "notebooks/UPDATE_PAGE";


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
