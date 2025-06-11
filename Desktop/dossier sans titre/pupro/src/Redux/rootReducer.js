import { combineReducers } from "redux";
import { connexionReducer } from "./connexionReducer";
import { prestationReducer } from "./PrestationReducer";



export const rootReducer = combineReducers({
    connexionReducer :connexionReducer,
    prestationReducer: prestationReducer
})