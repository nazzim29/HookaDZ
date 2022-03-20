import axios from "axios";
import { startLoading, stopLoading } from "./ui";
import { addError } from "./error";
import * as Location from "expo-location";
export function addProduit(produit) {
	return (dispatch, getState) => {
		const state = getState();
		if (
			state.commande.commandeEnCours.produits.find(
				(el) => el.prd == produit._id
			)
		) {
			state.commande.commandeEnCours.produits.find(
				(el) => el.prd == produit._id
			).quantite++;
			state.commande.commandeEnCours.montant += produit.prix;
			return dispatch({
				type: "ADD_PRODUCT",
				payload: state.commande.commandeEnCours.produits,
			});
		}
		state.commande.commandeEnCours.produits.push({
			prd: produit._id,
			quantite: 1,
		});
		state.commande.commandeEnCours.montant += produit.prix;
		dispatch({
			type: "ADD_PRODUCT",
			payload: state.commande.commandeEnCours.produits,
		});
	};
}
export function addExtra(extra) {
	return (dispatch, getState) => {
		dispatch({
			type: "ADD_EXTRAS",
			payload: {
				...extra,
			},
		});
	};
}
export function removeExtra(extra) {
	return (dispatch, getState) => {
		dispatch({
			type: "REMOVE_EXTRAS",
			payload: {
				...extra,
			},
		});
	};
}
export function removeProduit(produit) {
	return (dispatch, getState) => {
		dispatch({
			type: "REMOVE_PRODUCT",
			payload: {
				...produit,
			},
		});
	};
}
export function getAllCommandes() {
	return (dispatch, getState) => {
		const token = getState().auth.userToken;
		dispatch(startLoading());

		return axios
			.get("http://chicha-dz.herokuapp.com/commandes/commande", {
				headers: {
					"Content-Type": "application/json",
					Authorization: `TOKEN ${token || ""}`,
				},
			})
			.then(({ data }) => {
				dispatch(stopLoading());
				dispatch({
					type: "GET_ALL_COMMANDES",
					payload: data,
				});
			})
			.catch(({ data }) => {
				dispatch(stopLoading());
				dispatch(addError(data));
				dispatch({ type: "LOG_OUT" });
			});
	};
}

export function getCommandeDetails(id) {
	return (dispatch, getState) => {
		const token = getState().auth.userToken;
		dispatch(startLoading());
		console.log({id,token})
		return axios
			.get("http://chicha-dz.herokuapp.com/commandes/" + id, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `TOKEN ${token || ""}`,
				},
			})
			.then(({ data }) => {
				console.log(data)
				dispatch(stopLoading());
				dispatch({
					type: "GET_COMMANDE_DETAILS",
					payload: data,
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch(stopLoading());
				dispatch(addError(err));
				dispatch({ type: "LOG_OUT" });
			});
	};
}
export function PostCommande() {
	return (dispatch, getState) => {
		const { commandeEnCours } = getState().commande;
		const token = getState().auth.userToken;
		console.log(commandeEnCours);
		dispatch(startLoading());
		Location.requestForegroundPermissionsAsync()
			.then(({ status }) => {
				if (status !== "granted") {
					console.log("autorisation manquante");
					return;
				}
				return Location.getCurrentPositionAsync({}).then(({ coords }) => {
					commandeEnCours.commande.latitude = coords.latitude;
					commandeEnCours.commande.longitude = coords.longitude;
					commandeEnCours.commande.montant = 0
					return axios
						.post(
							"http://chicha-dz.herokuapp.com/commandes/insert",
							commandeEnCours,
							{
								headers: {
									"Content-Type": "application/json",
									authorization: `Bearer ${token || ""}`,
								},
							}
						)
						.then(({ data }) => {
							dispatch(stopLoading());
							dispatch({
								type: "POST_COMMANDES",
							});
							dispatch(getAllCommandes());
						}).catch(err => {
							dispatch(stopLoading());
							console.log(JSON.stringify(err, null, 2));
						});
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
}
export function Locate() {
	return (dispatch, getState) => {};
}
