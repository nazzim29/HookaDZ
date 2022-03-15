import { startLoading, stopLoading } from "./ui";
import axios from "axios";

export function getAllProducts() {
	return (dispatch, getState) => {
		dispatch(startLoading());
		return axios
            .get("https://chicha-dz.herokuapp.com/products", {
                headers: {
                    "Content-Type":"application/json",
                }
            })
			.then(({ data }) => {
				dispatch(stopLoading());
				dispatch({
					type: "GET_ALL_PRODUCTS",
					payload: data,
				});
			});
	};
}

export function updateProductsArray(products) {
	return (dispatch, getState) => {
		dispatch({
			type: "UPDATE_PRODUCTS_ARRAY",
			payload: products,
		});
	};
}
