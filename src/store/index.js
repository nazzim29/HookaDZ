import { createStore, combineReducers,compose,applyMiddleware } from "redux";
import authReducer from "../reducers/authReducer";
import uiReducer from "../reducers/uiReducer";
import productReducer from "../reducers/productReducer";
import errorReducer from "../reducers/errorReducer";
import commandeReducer from "../reducers/commandeReducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    product: productReducer,
    error: errorReducer,
    commande: commandeReducer
});
export const configureStore = () => {
    return createStore(rootReducer, compose(applyMiddleware(thunk)));
}