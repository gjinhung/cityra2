// constants
const LOAD_CITIES = "city/LOAD_CITIES";

const loadCities = (data) => ({
    type: LOAD_CITIES,
    payload: data,
});

export const getCities = () => async (dispatch) => {
    const response = await fetch(`/api/city`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadCities(data));
    } else {
        return (await response.json());
    }
};

export const getOneCity = (id) => async (dispatch) => {
    const response = await fetch(`/api/city/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadCities(data));
    } else {
        return (await response.json());
    }
};

export const cityByName = (city) => async (dispatch) => {
    const response = await fetch(`/api/city?city=${city}`);
    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        return (await response.json());
    }
};

const initialState = { cities: null };

const cities = (state = initialState, action) => {
    // const newState = { ...state }
    switch (action.type) {
        case LOAD_CITIES:
            return { ...action.payload }
        default:
            return state;
    }
}


export default cities;