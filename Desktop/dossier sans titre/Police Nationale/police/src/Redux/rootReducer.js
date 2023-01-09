import { combineReducers } from "redux";
import { questionReducer } from "./questionReducer";
import { connexionReducer } from "./connexionReducer";
import { categoryReducer } from "./categoryReducer";



export const rootReducer = combineReducers({
    questionReducer:questionReducer,
    connexionReducer :connexionReducer,
    categoryReducer:categoryReducer
})