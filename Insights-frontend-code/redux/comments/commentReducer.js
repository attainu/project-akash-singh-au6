import { commentActionTypes } from './commentActionTypes'

const INITIAL_STATE = {
    currentComment: null,
}

const commentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case commentActionTypes.GET_CURRENT_COMMENT:
            return {
                ...state,
                currentComment: action.payload,
            }
        case commentActionTypes.ADD_COMMENT:
            return {
                ...state,
                currentComment: action.payload,
            }
        default:
            return state
    }
}

export default commentReducer