import axios from "axios";
import { startLoading, stopLoading } from "./ui";
import { addError } from "./error";
import * as Location from "expo-location";
export function addProduit(produit) {
	return (dispatch, getState) => {
		dispatch({
			type: "ADD_PRODUCT",
			payload: {
				...produit,
			},
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
				dispatch({type:'LOG_OUT'})
			});
	};
}

export function PostCommande() {
	return (dispatch, getState) => {
		const { commandeEnCours } = getState();
		dispatch(startLoading());
		return axios
			.post("http://chicha-dz.herokuapp.com/commandes", commandeEnCours, {
				headers: {
					"Content-Type": "application/json",
					Authorisation: `Bearer ${token || ""}`,
				},
			})
			.then(({ data }) => {
				dispatch(stopLoading());
				dispatch({
					type: "POST_COMMANDES",
				});
			});
	};
}
export function Locate(fn) {
	return (dispatch, getState) => {
		Location.requestForegroundPermissionsAsync().then(({ status }) => {
			if (status !== "granted") {
				console.log("autorisation manquante");
				fn();
				return;
			}
			return Location.getCurrentPositionAsync({}).then(({coords}) => {
				console.log(coords);
				dispatch({
					type: "LOCATE",
					payload: {
						latitude: coords.latitude,
						longitude: coords.longitude,
					}
				});
				fn();
			});
		}).catch((err) => {
			console.log(err);
			fn();
		})
	};
}
