const GET_SCRATCH = "scratches/GET_SCRATCH";
const UPDATE_SCRATCH = "scratches/UPDATE_SCRATCH";

const getScratches = (scratch) => {
    return {
        type: GET_SCRATCH,
        scratch
    };
};

const updateScratch = (scratch) => {
    return {
        type: UPDATE_SCRATCH,
        scratch
    };
};

export const getAllScratches = (userId) => async (dispatch) => {

    const res = await fetch(`/api/scratches/${userId}/`);

    if (res.ok) {

      const data = await res.json();
      dispatch(getScratches(data));
      return data;

    }
}

export const editScratch = (scratchData, userId) => async (dispatch) => {
    const res = await fetch(`/api/scratches/${userId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scratchData),
    });

    const data = await res.json();
    dispatch(updateScratch(data));
    return data;
};


const scratches = (state = {}, action) => {
    let newState = {};
    switch (action.type) {

      case GET_SCRATCH:
        newState[action.scratch.id] = action.scratch;
        return newState;

      case UPDATE_SCRATCH:
        newState = { ...state, [action.scratch.id] : action.scratch }
        return newState;

      default:
        return state;
    }
};

export default scratches;
