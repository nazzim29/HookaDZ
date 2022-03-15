const initialState = {
	products: [],
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_ALL_PRODUCTS":
			return {
				...state,
				products: action.payload,
			};
		case "UPDATE_PRODUCTS_ARRAY":
			return {
				...state,
				products: action.payload,
			};
		default:
			return state;
	}
};
export default productReducer;