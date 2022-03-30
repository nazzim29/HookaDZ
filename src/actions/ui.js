import { useNavigation } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { Image } from "react-native";

const images = [
	require("../../assets/apple.svg"),
	require("../../assets/person-icon.png"),
	require("../../assets/email-1.png"),
	require("../../assets/password-icon.png"),
	require("../../assets/history-icon.png"),
	require("../../assets/plus-icon.png"),
	require("../../assets/bag-icon.png"),
	require("../../assets/arrow-back.png"),
	require("../../assets/phone-icon.png"),
	require("../../assets/key-icon.png"),
	require("../../assets/check-icon.png"),
	require("../../assets/remove-icon.png"),
	require("../../assets/minus-icon.png"),
	require("../../assets/info-icon.png"),
	require("../../assets/step-1-slider.png"),
	require("../../assets/step-2-slider.png"),
	require("../../assets/step-3-slider.png"),
	require("../../assets/step-4-slider.png"),
	require("../../assets/time-icon.png"),
	require("../../assets/truck-icon.png"),
	require("../../assets/coin-icon.png"),
	require("../../assets/map-icon.png"),
	require("../../assets/file-icon.png"),
	require("../../assets/logo-1.png"),
	require("../../assets/logo-2.png"),
	require("../../assets/logo-realist.jpg"),
];

export function startLoading() {
	return (dispatch, getState) => {
		if (getState().ui.isLoading == true) return;
		dispatch({
			type: "START_LOADING",
		});
	};
}
export function stopLoading() {
	return (dispatch, getState) => {
		if (getState().ui.isLoading == false) return;
		dispatch({
			type: "STOP_LOADING",
		});
	};
}

export function openCommandePanel() {
	return {
		type: "OPEN_COMMANDE_PANEL",
	};
}

export function closeCommandePanel() {
	return {
		type: "CLOSE_COMMANDE_PANEL",
	};
}

export function LoadAssests() {
	return (dispatch, getState) => {
		dispatch(startLoading());
		const icache = images.map((el) => {
			if (typeof el == "string") return Image.prefetch(el);
			else return Asset.fromModule(el).downloadAsync();
		});
		return Promise.all(icache)
			.then((res) => {
				dispatch({ type: "LOAD_ASSETS", payload: res });
				dispatch(stopLoading());
			})
			.catch((err) => console.warn(err));
	};
}
