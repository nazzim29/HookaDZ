const initialState = {
	commandes: [],
	evenements:[],
	commandeEnCours: {
		commande: {
			latitude: null,
			longitude: null,
			montant: 0
		},
		produits: [],
		extras: [],
		reseted:false,
	},
	livreurs:[],
	commande: null,
};
const commandeReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_ALL_COMMANDES":
			return {
				...state,
				commandes: action.payload,
			};
		case "GET_ALL_EVENTS":
			return {
				...state,
				evenements: action.payload,
			};
		case "GET_LIVREURS":
			return {
				...state,
				livreurs: action.payload,
			}
		case "GET_COMMANDE_DETAILS":
			return {
				...state,
				commande: action.payload,
			};
		case "POST_COMMANDE":
			state.commandes.push(action.payload);
			state.commandeEnCours = initialState.commandeEnCours;
			return {
				...state,
				commandeEnCours: initialState.commandeEnCours,
			};
		case "REMOVE_PRODUCT":
			return{
				...state,
				commandeEnCours: {
					...state.commandeEnCours,
					produits: action.payload.produits,
					commande: {
						...state.commandeEnCours.commande,
						montant: action.payload.montant,
					},
				},
			};
		case "MINUS_PRODUCT":
			return {
				...state,
				commandeEnCours: {
					...state.commandeEnCours,
					produits: [...action.payload.produits],
					commande: {
						...state.commandeEnCours.commande,
						montant: action.payload.montant,
					},
				},
			};
		case "MINUS_EXTRA":
			return {
				...state,
				commandeEnCours: {
					...state.commandeEnCours,
					extras: [...action.payload.extras],
					commande: {
						...state.commandeEnCours.commande,
						montant: action.payload.montant,
					},
				},
			};

		case "ADD_PRODUCT":
			//if product exist in commandeEnCours
			return {
				...state,
				commandeEnCours: {
					...state.commandeEnCours,
					produits: [...action.payload.produits],
					commande: {
						...state.commandeEnCours.commande,
						montant: action.payload.montant,
					},
				},
			};
		case "ADD_EXTRAS":
			return {
				...state,
				commandeEnCours: {
					...state.commandeEnCours,
					extras: [...action.payload.extras],
					commande: {
						...state.commandeEnCours.commande,
						montant: action.payload.montant,
					},
				},
			};
		case "REMOVE_EXTRAS":
			if (!state.commandeEnCours.extras.includes(action.payload)) return state;
			state.commandeEnCours[
				state.commandeEnCours.extras.indexOf(action.payload)
			].quantité--;
			if (
				state.commandeEnCours[
					state.commandeEnCours.extras.indexOf(action.payload)
				].quantité <= 0
			)
				state = state.commandeEnCours.extras.filter(
					({ _id }) => _id != action.payload._id
				);
			return state;
		case "VALIDATE":
			state.commandeEnCours.valid = true;
			return state;
		// case "LOCATE":
		// 	return {
		// 		...state,
		// 		commandeEnCours: {
		// 			...state.commandeEnCours,
		// 			latitude: action.payload.latitude,
		// 			longitude: action.payload.longitude,
		// 		},
		// 	};
		case "CLEAR_COMMANDE":
			return {
				...state,
				commandeEnCours: {
					commande: {
						latitude: null,
						longitude: null,
						montant: 0,
					},
					produits: [],
					extras: [],
					reseted:true,
				},
			};
		default:
			return state;
	}
};

export default commandeReducer;
