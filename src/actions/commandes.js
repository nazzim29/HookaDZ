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
		} else {
			state.commande.commandeEnCours.produits.push({
				prd: produit._id,
				quantite: 1,
			});
		}
		if (!state.commande.commandeEnCours.montant)
			state.commande.commandeEnCours.montant = 0;
		state.commande.commandeEnCours.montant += produit.prix;
		dispatch({
			type: "ADD_PRODUCT",
			payload: {
				produits: state.commande.commandeEnCours.produits,
				montant: state.commande.commandeEnCours.montant,
			},
		});
	};
}
export function minusProduit(produit) {
	return (dispatch, getState) => {
		const state = getState();
		let p = state.commande.commandeEnCours.produits.find(
			(el) => el.prd == produit._id
		);
		if (!p) return;
		if (p.quantite > 1) {
			p.quantite--;
			state.commande.commandeEnCours.montant -= produit.prix;
		} else {
			state.commande.commandeEnCours.produits =
				state.commande.commandeEnCours.produits.filter(
					(el) => el.prd != produit._id
				);
			state.commande.commandeEnCours.montant -= produit.prix;
		}

		dispatch({
			type: "MINUS_PRODUCT",
			payload: {
				produits: state.commande.commandeEnCours.produits,
				montant: state.commande.commandeEnCours.montant,
			},
		});
	};
}

export function minusExtra(extra) {
	return (dispatch, getState) => {
		const state = getState();
		let p = state.commande.commandeEnCours.extras.find(
			(el) => el.prd == extra._id
		);
		if (!p) return;
		if (p.quantite > 1) {
			p.quantite--;
		} else {
			state.commande.commandeEnCours.extras =
				state.commande.commandeEnCours.extras.filter(
					(el) => el.prd != extra._id
				);
		}
		// console.log(state.commande.commandeEnCours.montant, extra.prix);
		// state.commande.commandeEnCours.montant = state.commande.commandeEnCours.montant - extra.prix;
		dispatch({
			type: "MINUS_EXTRA",
			payload: {
				extras: state.commande.commandeEnCours.extras,
				montant: state.commande.commandeEnCours.montant,
			},
		});
	};
}

export function addExtra(extra) {
	return (dispatch, getState) => {
		const commandeEnCours = getState().commande.commandeEnCours;
		if (commandeEnCours.extras.find((el) => el.prd === extra._id)) {
			commandeEnCours.extras.find((el) => el.prd === extra._id).quantite++;
		} else {
			commandeEnCours.extras.push({
				prd: extra._id,
				quantite: 1,
			});
		}
		// if (commandeEnCours.commande.montant == NaN)
		commandeEnCours.commande.montant += extra.prix;

		dispatch({
			type: "ADD_EXTRAS",
			payload: {
				extras: commandeEnCours.extras,
				montant: commandeEnCours.commande.montant,
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
		const state = getState();
		let p = state.commande.commandeEnCours.produits.find(
			(el) => el.prd == produit._id
		);
		if (!p) return;
		state.commande.commandeEnCours.produits =
			state.commande.commandeEnCours.produits.filter(
				(el) => el.prd != produit._id
			);
		if (state.commande.commandeEnCours.montant > p.quantite * produit.prix)
			state.commande.commandeEnCours.montant -= p.quantite * produit.prix;
		else state.commande.commandeEnCours.montant = 0;
		dispatch({
			type: "REMOVE_PRODUCT",
			payload: {
				produits: state.commande.commandeEnCours.produits,
				montant: state.commande.commandeEnCours.montant,
			},
		});
	};
}
export function getLivreurs() {
	return (dispatch, getState) => {
		const state = getState();
		const token = getState().auth.userToken;
		dispatch(startLoading());
		return axios
			.get("http://chicha-dz.herokuapp.com/users", {
				headers: {
					Authorization: `Bearer ${token || ""}`,
					"Content-Type": "application/json",
				},
			})
			.then(({ data }) => {
				console.log({ data });
				dispatch(stopLoading());
				dispatch({
					type: "GET_LIVREURS",
					payload: data,
				});
			})
			.catch((err) => {
				dispatch(stopLoading());
				console.log(err);
			});
	};
}
export function getAllCommandes() {
	return (dispatch, getState) => {
		const token = getState().auth.userToken;
		dispatch(startLoading());
		console.log(token);
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
			.catch(({ data, response }) => {
				console.log(response);
				dispatch(stopLoading());
				dispatch(addError(data));
				dispatch({ type: "LOG_OUT" });
			});
	};
}
export function getAllEvents() {
	return (dispatch, getState) => {
		const token = getState().auth.userToken;
		dispatch(startLoading());
		console.log(token);
		return axios
			.get("http://chicha-dz.herokuapp.com/evenements", {
				headers: {
					"Content-Type": "application/json",
					Authorization: `TOKEN ${token || ""}`,
				},
			})
			.then(({ data }) => {
				console.log(data)
				dispatch(stopLoading());
				dispatch({
					type: "GET_ALL_EVENTS",
					payload: data,
				});
			})
			.catch(({ data, response }) => {
				console.log(response);
				dispatch(stopLoading());
				dispatch(addError(data));
				dispatch({ type: "LOG_OUT" });
			});
	};
}
export function cancelCommande(id, navigation=null) {
	return (dispatch, getState) => {
		const token = getState().auth.userToken;
		dispatch(startLoading());
		return axios.delete(`http://chicha-dz.herokuapp.com/commandes/${id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `TOKEN ${token || ""}`,
			},
		})
			.then(({ data }) => {
				dispatch(stopLoading());
				dispatch(getAllCommandes())
				if(navigation && navigation.canGoBack())navigation.goBack();
			})
			.catch(({ data, response }) => {
				console.log(response);
				dispatch(stopLoading());
				dispatch(addError(data));
				dispatch({ type: "LOG_OUT" });
			});
	}
}
export function getCommandeDetails(id) {
	return (dispatch, getState) => {
		const token = getState().auth.userToken;
		dispatch(startLoading());
		return axios
			.get("http://chicha-dz.herokuapp.com/commandes/" + id, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `TOKEN ${token || ""}`,
				},
			})
			.then(({ data }) => {
				dispatch(stopLoading());
				console.log(data)
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

export function UpdateCommande(commande) {
	return (dispatch, getState) => {
		const token = getState().auth.userToken;
		dispatch(startLoading());
		Location.requestForegroundPermissionsAsync()
			.then(({ status }) => {
				if (status !== "granted") {
					console.log("autorisation manquante");
					return;
				}
				return Location.getCurrentPositionAsync({}).then(({ coords }) => {
					return axios
						.patch(
							"http://chicha-dz.herokuapp.com/commandes/" + commande._id,
							commande,
							{
								headers: {
									"Content-Type": "application/json",
									authorization: `Bearer ${token || ""}`,
								},
							}
						)
						.then(({ data }) => {
							dispatch(stopLoading());
							dispatch(getAllCommandes());
						})
						.catch((err) => {
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
export function PostCommande(navigate) {
	return (dispatch, getState) => {
		dispatch(startLoading());
		const { commandeEnCours } = getState().commande;
		const token = getState().auth.userToken;

		console.log({ token });
		Location.requestForegroundPermissionsAsync()
			.then(({ status }) => {
				if (status !== "granted") {
					console.log("autorisation manquante");
					return;
				}
				return Location.getCurrentPositionAsync({}).then(({ coords }) => {
					commandeEnCours.commande.latitude = coords.latitude;
					commandeEnCours.commande.longitude = coords.longitude;
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
								type: "CLEAR_COMMANDE",
							});
							navigate({
								index: 1,
								routes: [{ name: "Home" }, { name: "Historique" }],
							});
							dispatch(getAllCommandes());
						})
						.catch((err) => {
							navigate({
								index: 0,
								routes: [{ name: "Home" }],
							});
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
export function Locate(c) {
	const api_key = "55d7891fe1952405d1eacca9c48a3f19";
	return (dispatch, getState) => {
		dispatch(startLoading());
		Location.requestForegroundPermissionsAsync().then(({ status }) => {
			if (status !== "granted") {
				console.log("autorisation manquante");
				return;
			}
			return Location.getCurrentPositionAsync({}).then(({ coords }) => {
				// get adresse from coords
				const url = `http://api.positionstack.com/v1/reverse?access_key=${api_key}&query=${coords.latitude},${coords.longitude}`;
				return axios
					.get(url)
					.then(({ data }) => {
						dispatch(stopLoading());
						dispatch({
							type: "LOCATE",
							payload: {
								latitude: coords.latitude,
								longitude: coords.longitude,
								adresse: data.data[0].name,
							},
						});
					})
					.catch((err) => {
						console.log(err);
					});
			});
		});
	};
}

export function PostEvent(event, cb) {
	return (dispatch, getState) => {
		const token = getState().auth.userToken;
		dispatch(startLoading());
		return axios
			.post("http://chicha-dz.herokuapp.com/evenements/insert", event, {
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token || ""}`,
				},
			})
			.then(({ data }) => {
				dispatch(stopLoading());
				cb("EventSuccess");
				dispatch(getAllCommandes());
			})
			.catch((err) => {
				dispatch(stopLoading());
				cb("EventError");
				console.log(JSON.stringify(err, null, 2));
			});
	};
}
