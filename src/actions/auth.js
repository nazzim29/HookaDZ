import axios from "axios";
import { startLoading, stopLoading } from "./ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllCommandes } from "./commandes";

export function readToken() {
	return (dispatch, getState) => {
		dispatch(startLoading());
		return AsyncStorage.getItem("token")
			.then((token) => {
				dispatch(stopLoading());
				if (!token) return;
				dispatch({
					type: "AUTHENTICATE",
					payload: token,
				});
			})
			.catch((err) => console.log(err));
	};
}

export function login(credidentials) {
	return (dispatch, getState) => {
		dispatch(startLoading());
		return axios
			.post("http://chicha-dz.herokuapp.com/auth/signin", credidentials, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			})
			.then(({ data }) => {
				AsyncStorage.setItem("token", data.token)
					.then((hh) => {
						dispatch(stopLoading());
						dispatch({
							type: "LOGIN",
							payload: {
								userToken: data.token,
								email: data.result.email,
								nom: data.result.nom,
								prenom: data.result.prenom,
								numero: data.result.numero,
								isAuthenticated: true,
							},
						});
						dispatch(getAllCommandes());
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				if (err.response.data.message == "user not found") {
					dispatch({
						type: "ADD_ERROR",
						payload: "Email ou mot de passe incorrect",
					});
				} else {
					dispatch({ type: "ADD_ERROR", payload: "une Erreur s'est produite" });
				}
				dispatch(stopLoading());
			});
	};
}

export function signup(user) {
	return (dispatch, getState) => {
		dispatch(startLoading());
		return axios
			.post("http://chicha-dz.herokuapp.com/auth/signup", user, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			})
			.then(({ data }) => {
				AsyncStorage.setItem("token", data.token)
					.then((hh) => {
						dispatch(stopLoading());
						dispatch({
							type: "LOGIN",
							payload: {
								userToken: data.token,
								email: data.result.email,
								nom: data.result.nom,
								prenom: data.result.prenom,
								numero: data.result.numero,
								isAuthenticated: true,
							},
						});
						dispatch(getAllCommandes());
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				dispatch({
					type: "ADD_ERROR",
					payload: err.response?.data?.message || "une erreur est survenue",
				});
				dispatch(stopLoading());
			});
	};
}
