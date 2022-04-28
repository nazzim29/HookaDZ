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
	require("../../assets/oasis.jpg"),
	require("../../assets/redbull.jpg"),
	require("../../assets/Schweppes.png"),
	require("../../assets/tuyau.jpg"),
	require("../../assets/tuyau.png"),
	require("../../assets/cocacola.jpg"),
	require("../../assets/edit-icon.png"),
	require("../../assets/sociale-bg.png"),
	require("../../assets/facebook.png"),
	require("../../assets/instagram.png"),
	require("../../assets/event-icon.png"),
	require("../../assets/marker-icon.png"),
	require("../../assets/event-bg.jpg"),
	require("../../assets/adalya_hawaii.jpg"),
	require("../../assets/adalya_lady_killer.jpg"),
	require("../../assets/adalya_love_66.png"),
	require("../../assets/adalya_mi_amor.jpg"),
	require("../../assets/adalya_swiss_bonon.jpg"),
	require("../../assets/bouteille-eau.jpg"),
	require("../../assets/charbon.jpg"),
	require("../../assets/menthe_fakher.png"),
	require("../../assets/pomme_fakher.png"),
	require("../../assets/hamburger-icon.png"),
	require("../../assets/logout.png"),
	require("../../assets/profile.png"),
	require("../../assets/hookah.png"),
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
