const initialState = {
	isLoading: false,
	commandePanel: false,
	assets: [],
	currentAddress: null,
};

const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case "START_LOADING":
			return {
				...state,
				isLoading: true,
			};
		case "STOP_LOADING":
			return {
				...state,
				isLoading: false,
			};
		case "OPEN_COMMANDE_PANEL":
			return {
				...state,
				commandePanel: true,
			};
		case "CLOSE_COMMANDE_PANEL":
			return {
				...state,
				commandePanel: false,
			};
		case "LOAD_ASSETS":
			return {
				...state,
				assets: action.payload,
			};
		case "LOCATE":
			return {
				...state,
				currentAddress: action.payload.adresse,
			};
		default:
			return state;
	}
};

export default uiReducer;
