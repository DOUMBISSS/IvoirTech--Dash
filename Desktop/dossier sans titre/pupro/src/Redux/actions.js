

export function AddQuestion(question) {
    return {
        type: 'GET-QUESTION',
        payload: question
    }
}
export function getAllQuestions(questions) {
    return {
        type: 'GET-ALL-QUESTIONS',
        payload:questions
    }
}
export function addComment(comments){
    return {
        type: 'GET-COMMENT',
        payload: comments
    }
}

export function addNewUser(user){
    return {
        type: 'GET-NEW-USER',
        payload: user
    }
}
export function getUser(users){
    return {
        type: 'GET-USER',
        payload: users
    }
}

export function getCategories(category){
    return {
        type: 'GET-CATEGORIES',
        payload:category
    }
}