import axios from "axios";
import { startLoading, stopLoading } from "./ui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllCommandes } from "./commandes";

export function readToken() {
  return (dispatch, getState) => {
    dispatch(startLoading());
    return AsyncStorage.getItem("token")
      .then((token) => {
        token = JSON.parse(token);
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
        console.log();
        AsyncStorage.setItem("token", JSON.stringify({
					_id: data.result._id,
					isAuthenticated: true,
					userToken: data.token,
					email: data.result.email,
					nom: data.result.nom,
					prenom: data.result.prenom,
					numero: data.result.numero,
          role: data.result.role,
          isAdmin: data.result.role === "client"? false : true,
				}))
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
								role: data.result.role,
								_id: data.result._id,
							},
						});
					})
					.catch((err) => {
						console.log(err);
					});
      })
      .catch((err) => {
        console.log(err.response);
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
export function logout(cb) {
  return (dispatch, getState) => {
    dispatch(startLoading());
    return AsyncStorage.removeItem("token")
      .then((hh) => {
        dispatch(stopLoading());
        dispatch({
          type: "LOGOUT",
          payload: {},
        });
      })
      .catch((err) => {
        dispatch(stopLoading());
        console.log(err);
      });
  };
}

export function signup(user) {
  return (dispatch, getState) => {
    dispatch(startLoading());
    user = {
      ...user,
      confirmPassword: user.password,
    };
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
            console.log({ data });
            dispatch(stopLoading());
            dispatch({
              type: "LOGIN",
              payload: {
                userToken: data.token,
                email: data.result.email,
                nom: data.result.nom,
                numero: data.result.numero,
                isAuthenticated: true,
                role: data.result.role,
                _id: data.result._id,
              },
            });
            dispatch(getAllCommandes());
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: "ADD_ERROR",
          payload: err.response?.data?.message || "une erreur est survenue",
        });
        dispatch(stopLoading());
      });
  };
}

export function sendResetRequest(email, next = null) {
  return (dispatch, getState) => {
    dispatch(startLoading());
    return axios
      .post("http://chicha-dz.herokuapp.com/mail", { email })
      .then(({ data }) => {
        dispatch(stopLoading());
        if (next) next("Forgot-2", { email });
      })
      .catch((err) => {
        dispatch(stopLoading());
        console.log(err);
        dispatch({
          type: "ADD_ERROR",
          payload: err.response?.data?.message || "une erreur est survenue",
        });
      });
  };
}
export function resetPassword(resetData, next = null) {
  return (dispatch, getState) => {
    dispatch(startLoading());
    return axios
      .post("http://chicha-dz.herokuapp.com/password", resetData)
      .then((res) => {
        console.log(res);
        dispatch(stopLoading());
        next.navigate("Forgot-4", {
          email: resetData.email,
          password: resetData.password,
        });
      })
      .catch((err) => {
        dispatch(stopLoading());
        next.goBack();
        console.log(err.response);
        dispatch({
          type: "ADD_ERROR",
          payload: err.response?.data?.message || "une erreur est survenue",
        });
      });
  };
}
