


const initialState = {
    questions: [],
    question: [],
  
}

export function questionReducer(state = initialState, action) {
    switch (action.type) {
        case "GET-QUESTION": {
            return {
                ...state,question :action.payload
            } 
        }
        case "GET-ALL-QUESTIONS": {
            return {
                ...state,questions :action.payload
            } 
        }
        case "GET-COMMENT":{
            return {
                ...state
            }
        }
        default: {
            return state
        }
    }
  
}