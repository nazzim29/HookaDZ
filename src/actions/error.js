export function addError (error) {
    return {
        type: 'ADD_ERROR',
        payload: error
    }
}
export function clearError() {
    return {
        type: 'CLEAR_ERROR'
    }
}