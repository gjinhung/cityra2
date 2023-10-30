// constants
const LOAD_BOOKINGS = "booking/LOAD_BOOKINGS";
const REMOVE_BOOKINGS = "booking/REMOVE_BOOKINGS";
const UPDATE_BOOKINGS = 'booking/UPDATE_BOOKINGS'

const loadBooking = (data) => ({
    type: LOAD_BOOKINGS,
    payload: data,
});

const postBooking = (data) => ({
    type: UPDATE_BOOKINGS,
    payload: data
})

const removeBooking = (data) => ({
    type: REMOVE_BOOKINGS,
    payload: data
});

export const getBookings = () => async (dispatch) => {
    const response = await fetch(`/api/bookings`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadBooking(data['bookings']));
    } else {
        return { 'errors': "Get Bookings Thunk Failed" };
    }
};

export const getOneBooking = (id) => async (dispatch) => {
    const response = await fetch(`/api/bookings/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadBooking(data));
        return data
    } else {
        const data = await response.json()
        return data;
    }
};

export const newBooking = (booking, id) => async (dispatch) => {
    const response = await fetch(`/api/bookings/tour/${id}/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(postBooking(data));
        return data
    } else if (response.status < 500) {
        console.log('booking failed')
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ["A new booking error occurred. Please try again."];
    }
};

export const editBooking = (id, booking) => async (dispatch) => {
    const response = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(postBooking(data));
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ["An error occurred while updating booking. Please try again."];
    }
};

export const deleteBooking = (id) => async (dispatch) => {
    const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(removeBooking(id));
    } else if (response.status < 500) {
        // const data = await response.json();
        // if (data.errors) {
        //     return data.errors;
        // }
    } else {
        return ["An error occurred while deleting a booking. Please try again."];
    }
};

const initialState = { bookings: null };

const bookings = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_BOOKINGS:
            return { ...action.payload };
        case UPDATE_BOOKINGS:
            const data = action.payload
            newState[data.id] = data
            return newState
        case REMOVE_BOOKINGS:
            return newState[action.payload] = null
        default:
            return state;
    }
}


export default bookings;