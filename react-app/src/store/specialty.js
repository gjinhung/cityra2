// constants
const LOAD_SPECIALTIES = "specialty/LOAD_SPECIALTIES";

const loadSpecialties = (data) => ({
    type: LOAD_SPECIALTIES,
    payload: data,
});

export const getSpecialties = () => async (dispatch) => {
    const response = await fetch(`/api/specialty`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpecialties(data));
    } else {
        return (await response.json());
    }
};

export const getOneSpecialty = (id) => async (dispatch) => {
    const response = await fetch(`/api/specialty/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpecialties(data));
    } else {
        return (await response.json());
    }
};

export const typeByName = (type) => async (dispatch) => {
    const response = await fetch(`/api/specialty?specialty=${type}`);
    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        return (await response.json());
    }
};

const initialState = { specialties: null };

const specialties = (state = initialState, action) => {
    // const newState = { ...state }
    switch (action.type) {
        case LOAD_SPECIALTIES:
            return { ...action.payload }
        default:
            return state;
    }
}


export default specialties;