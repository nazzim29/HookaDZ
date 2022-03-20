const initialState = {
	isAuthenticated: false,
    userToken: null,
    email: null,
    nom: null,
    prenom: null,
    numero: null,
};

const authReducer = (state = initialState, action) => {
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
				isAuthenticated:true,
				userToken: action.payload,
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
