// constants
const LOAD_DATES = "date/LOAD_DATES";

const loadDates = (data) => ({
    type: LOAD_DATES,
    payload: data,
});

export const getDates = () => async (dispatch) => {
    const response = await fetch(`/api/dates`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadDates(data));
    } else {
        return (await response.json());
    }
};

export const getOneDate = (id) => async (dispatch) => {
    const response = await fetch(`/api/dates/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadDates(data));
    } else {
        return (await response.json());
    }
};

export const dateByName = (date) => async (dispatch) => {
    const response = await fetch(`/api/dates?date=${date}`);
    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        return (await response.json());
    }
};


const initialState = { dates: null };

const dates = (state = initialState, action) => {
    // const newState = { ...state }
    switch (action.type) {
        case LOAD_DATES:
            return { ...action.payload }
        default:
            return state;
    }
}


export default dates;