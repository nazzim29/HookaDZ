const initialState = {
	commandes: [],
	commandeEnCours: {
		geolocalisation: null,
		produits: [],
		valid: false,
		sended: false,
        get prixTotal() {
            return this.produits.reduce((sum,{comm_quantite,prix})=>sum+(comm_quantite*prix),0)
        },
		extras: [],
	},
};
const commandeReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_ALL_COMMANDES":
			return state.commandes = action.payload;
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
			const p = state.commandeEnCours.produits.find((el) => action.payload._id == el.prd)
			if (!p) {
				state.commandeEnCours.produits.push({
					prd: action.payload._id,
					quantite:1,
				});
			} else {
				p.quantite++;
			}
			console.log(state)
			return {
				...state
			};
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
            state.commandeEnCours.geolocalisation = action.payload
			return {
				...state
			}
		default:
			return state;
	}
};


export default commandeReducer;