import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './user/userReducer'
import videoReducer from './videos/videoReducer'
import commentReducer from './comments/commentReducer'
import likeReducer from './likes/likeReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'videos', 'comments', 'likes'],
}

const rootReducer = combineReducers({
  user: userReducer,
  videos: videoReducer,
  comments: commentReducer,
  likes: likeReducer
})

export default persistReducer(persistConfig, rootReducer)
