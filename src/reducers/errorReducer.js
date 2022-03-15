const initialState = {
    message: null
}

const errorReducer = (state = initialState, action)=>{
    switch (action.type) {
        case "ADD_ERROR":
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}

export default errorReducer;