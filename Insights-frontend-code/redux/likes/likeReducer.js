import { likeActionTypes } from './likeActionTypes'

const INITIAL_STATE = {
    currentLike: false,
}

const likeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case likeActionTypes.GET_CURRENT_LIKE:
            return {
                ...state,
                currentLike: action.payload,
            }
        case likeActionTypes.ADD_LIKE:
            return {
                ...state,
                currentLike: action.payload,
            }
        default:
            return state
    }
}

export default likeReducer