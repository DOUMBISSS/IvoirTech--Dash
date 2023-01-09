const initialState = {
    categories: []
}

export function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case "GET-CATEGORIES": {
            return {
                ...state,categories : action.payload
            } 
        }
        default: {
            return state
        }
    }
  
}