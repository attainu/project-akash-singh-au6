import { videoActionTypes } from './videoActionTypes'

const INITIAL_STATE = {
    currentVideo: null,
}

const videoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case videoActionTypes.GET_CURRENT_VIDEO:
            return {
                ...state,
                currentVideo: action.payload,
            }
        case videoActionTypes.UPLOAD_VIDEO:
            return {
                ...state,
                currentVideo: action.payload,
            }
        default:
            return state
    }
}

export default videoReducer
