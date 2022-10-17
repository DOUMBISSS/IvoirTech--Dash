import { combineReducers } from "redux";
import { homeReducer } from './homeReducer';
import { rentHomeReducer } from "./rentHomeReducer";



export const rootReducer = combineReducers({
    homeReducer : homeReducer,
    rentHomeReducer : rentHomeReducer 
})