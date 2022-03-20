const initialState = {
	commandes: [],
	commandeEnCours: {
		commande: {
			latitude: null,
			longitude: null,
			montant: 0,
		},
		produits: [],
		confirmation: false,
		extras: [],
	},
	commande:null
};
const commandeReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_ALL_COMMANDES":
			return {
				...state,
				commandes: action.payload,
			}
		case "GET_COMMANDE_DETAILS":
		
			return {
				...state,
				commande: action.payload
			}
		case "POST_COMMANDE":
			state.commandes.push(action.payload);
			state.commandeEnCours = action.payload;
			return state;
		case "REMOVE_PRODUCT":
			if (!state.commandeEnCours.produits.includes(action.payload))
				return state;
			state.commandeEnCours[
				state.commandeEnCours.produits.indexOf(action.payload)
			].quantité--;
			if (
				state.commandeEnCours[
					state.commandeEnCours.produits.indexOf(action.payload)
				].quantité <= 0
			)
				state = state.commandeEnCours.produits.filter(
					({ _id }) => _id != action.payload._id
				);
			return state;
		case "ADD_PRODUCT":
			console.log(action.payload);
			//if product exist in commandeEnCours 
			return {
				...state,
				commandeEnCours: {
					...state.commandeEnCours,
					produits: [...action.payload]
				},
			}
		case "ADD_EXTRAS":
			if (
				state.commandeEnCours.extras.find((el) => action.payload._id == el._id)
			)
				state.commandeEnCours[
					state.commandeEnCours.extras.findIndex(
						(el) => action.payload._id == el._id
					)
				].quantite++;
			else
				state.commandeEnCours.extras.push({
					extra: action.payload._id,
					quantite: 1,
				});
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
        case "LOCATE":
			return {
				...state,
				...action.payload
			}
		default:
			return state;
	}
};


export default commandeReducer;