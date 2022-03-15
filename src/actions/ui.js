import { Asset } from "expo-asset";
import {Image} from "react-native";
const images = [
	require("../../assets/apple.svg"),
	require("../../assets/person-icon.png"),
	require("../../assets/email-1.png"),
	require("../../assets/password-icon.png"),
	require("../../assets/history-icon.png"),
	require("../../assets/plus-icon.png"),
	require("../../assets/bag-icon.png"),
	require("../../assets/arrow-back.png"),
];

export function startLoading() {
	return {
		type: "START_LOADING",
	};
}
export function stopLoading() {
	return {
		type: "STOP_LOADING",
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
        const icache = images.map(el => {
            if (typeof el == "string")
                return Image.prefetch(el);
            else
                return Asset.fromModule(el).downloadAsync();
        })
		return Promise.all(icache).then((res) => {
			dispatch({type: "LOAD_ASSETS", payload: res});
			dispatch(stopLoading());
		}).catch(err=>console.warn(err));
    }
        
}
