const GET_EVERY_PAGE = "pages/GET_EVERY_PAGE";

// get like EVERY PAGE regardless of notebook. for search functions
const getEveryPage = (pages) => {
  return {
    type: GET_EVERY_PAGE,
    pages
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


const all_pages = (state = {}, action) => {
    let newState = {};
    switch (action.type) {

      case GET_EVERY_PAGE:
        action.pages.all_pages.forEach((page) => {
          newState[page.id] = page;
        });
        return newState;

      default:
        return state;
    }
};

export default all_pages;


//TODO:
// add trash stuff to this file and test it
// need trash seeder data
