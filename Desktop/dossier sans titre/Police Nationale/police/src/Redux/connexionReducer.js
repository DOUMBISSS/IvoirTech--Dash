


const initialState = {
    isAuth:"" ,
    token: "",
    id: "",
    email: "",
    name : "",
}

export function connexionReducer(state = initialState, action) {
    switch (action.type) {
        case "GET-NEW-USER": {
            return {
                ...state,user : action.payload
            } 
        }
        case "GET-USER": {
            return action.payload
        }
        default: {
            return state
        }
    }
  
}