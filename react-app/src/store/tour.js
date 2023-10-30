// constants
const LOAD_TOURS = "tours/LOAD_TOURS";
const REMOVE_TOURS = "tours/REMOVE_USER";
const UPDATE_TOURS = 'tours/UPDATE_TOURS'

const loadTour = (data) => ({
    type: LOAD_TOURS,
    payload: data,
});

const postTour = (data) => ({
    type: UPDATE_TOURS,
    payload: data
})

const removeTour = (data) => ({
    type: REMOVE_TOURS,
    payload: data
});

export const getTours = () => async (dispatch) => {
    const response = await fetch(`/api/tours`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadTour(data['tours']));
    } else {
        return { 'errors': "Get Tours Thunk Failed" };
    }
};

export const getOneTour = (id) => async (dispatch) => {
    const response = await fetch(`/api/tours/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadTour(data));
        return data
    } else {
        const data = await response.json()
        return data;
    }
};

export const newTour = (tour) => async (dispatch) => {
    const response = await fetch("/api/tours/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tour),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(postTour(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data) {
            return data;
        }
    } else {
        return ["A posting error occurred. Please try again."];
    }
};

export const editTour = (id, tour) => async (dispatch) => {
    const response = await fetch(`/api/tours/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tour),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(postTour(data));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data) {
            return data;
        }
    } else {
        return ["An error occured while updating tour. Please try again."];
    }
};

export const deleteTour = (id) => async (dispatch) => {
    const response = await fetch(`/api/tours/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        console.log('ok')
        dispatch(removeTour(id));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred while deleting a tour. Please try again."];
    }
};

const initialState = { tours: null };

const tours = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_TOURS:
            return { ...action.payload };
        case UPDATE_TOURS:
            const data = action.payload
            newState[data.id] = data
            return newState
        case REMOVE_TOURS:
            return newState[action.payload] = null
        default:
            return state;
    }
}


export default tours;