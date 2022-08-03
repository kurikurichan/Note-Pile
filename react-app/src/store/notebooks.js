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

const deleteNotebook = (notebook) => {
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


// export const editNotebook = (name, id) => async (dispatch) => {
//     const res = await fetch(`/api/servers/${id}/edit`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(name),
//     });

//     const data = await res.json();
//     dispatch(editServer(data));
// };
