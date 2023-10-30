// constants
const GET_USERS = "users/GET_USERS";
const SET_USER = 'users/SET_USER'

const getUsers = (users) => ({
	type: GET_USERS,
	payload: users,
});

const setUser = (user) => ({
	type: SET_USER,
	payload: user
})


const initialState = { user: null };

export const allUsers = () => async (dispatch) => {
	const response = await fetch("/api/users/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(getUsers(data['users']));
	}
};

export const oneUser = (id) => async (dispatch) => {
	const response = await fetch(`/api/users/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(setUser(data));
	}
};

export default function users(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return { ...action.payload };
		case SET_USER:
			let newState = {}
			newState[`${action.payload.id}`] = action.payload
			return newState
		default:
			return state;
	}
}