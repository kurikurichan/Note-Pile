const GET_ALL_NOTEBOOKS = "notebooks/GET_ALL_NOTEBOOKS";
const CREATE_NOTEBOOK = "notebooks/CREATE_NOTEBOOK";
const UPDATE_NOTEBOOK = "notebooks/UPDATE_NOTEBOOK";
const DELETE_NOTEBOOK = "notebooks/DELETE_NOTEBOOK";

const getNotebooks = (notebooks) => {
    return {
        type: GET_ALL_NOTEBOOKS,
        notebooks
    };
};

const createNotebook = (notebook) => {
    return {
        type: CREATE_NOTEBOOK,
        notebook
    };
};

const updateNotebook = (notebook) => {
    return {
        type: UPDATE_NOTEBOOK,
        notebook
    };
};

const delNotebook = (notebook) => {
    return {
        type: DELETE_NOTEBOOK,
        notebook
    };
};

export const getAllNotebooks = () => async (dispatch) => {

    const res = await fetch(`/api/notebooks/`);

    if (res.ok) {

      const data = await res.json();
      dispatch(getNotebooks(data));
      return data;

    }
}

export const newNotebook = (notebook) => async (dispatch) => {

    const res = await fetch("/api/notebooks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notebook),
    });

    if (res.ok) {
      const data = await res.json;

      dispatch(createNotebook(data));
      return data;
    }
};


export const editNotebook = (title, notebookId) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${notebookId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(title),
    });

    const data = await res.json();
    dispatch(updateNotebook(data));
};

export const deleteNotebook = (userId, notebookId) => async (dispatch) => {

    const res = await fetch(`/api/notebooks/${userId}/${notebookId}`, {
        method: "DELETE"
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(delNotebook(data));
      }

}

const notebooks = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
      case GET_ALL_NOTEBOOKS:
        allServers.allServers = {}
        action.notebooks.forEach((notebook) => {
          newState[notebook.id] = notebook;
        });
        return newState;
      case CREATE_NOTEBOOK:
        newState[action.notebook.id] = action.notebook;
        return newState;
      case UPDATE_NOTEBOOK:
        newState = { ...state, [action.notebook.id]: action.notebook };
        return newState;
      case DELETE_NOTEBOOK:
        newState = { ...state };
        delete newState[action.notebook];
        return newState;
      default:
        return state;
    }
  };

  export default notebooks;
