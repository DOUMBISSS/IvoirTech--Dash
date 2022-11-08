

export function getHomes(homes) {
    return {
        type: 'GET-HOMES',
        payload: homes
    }
}

export function getRentHomes(homes){
    return{
        type: 'GET-RENT-HOMES',
        payload: homes
    }
}