const initialState = {
	products: [],
	extras: [
		{
			name: "Andy Capp’s Hot Fries",
		},
		{
			name: "Andy Capp’s Hot Fries",
		},
		{
			name: "Andy Capp’s Hot Fries",
		},
		{
			name: "Andy Capp’s Hot Fries",
		},
		{
			name: "Andy Capp’s Hot Fries",
		},
		{
			name: "Andy Capp’s Hot Fries",
		},
	],
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
		case "GET_ALL_EXTRAS":
			return {
				...state,
				extras: action.payload,
			};
		default:
			return state;
	}
};
export default productReducer;