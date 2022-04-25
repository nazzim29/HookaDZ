const initialState = {
	_id: null,
	isAuthenticated: false,
    userToken: null,
    email: null,
    nom: null,
    prenom: null,
	numero: null,
	role: null,
	isAdmin: false,
};

const authReducer = (state = initialState, action) => {
	console.log(action.type)
	switch (action.type) {

		case "RESTORE_TOKEN":
			return {
				...state,
				userToken: action.token,
			};
		case "LOGIN":
			return {
				...state,
				...action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				...initialState,
			};
		case "AUTHENTICATE":
			return {
				...state,
				...action.payload,
			}
		case 'LOG_OUT':
			return {
				...state,
				...initialState,
			}
		default:
			return state;
	}
};
export default authReducer;
