import { likeActionTypes } from './likeActionTypes'

export const getAlllikes = (like) => ({
  type: likeActionTypes.GET_CURRENT_like,
  payload: like,
})

export const Addlike = (like) => ({
    type: likeActionTypes.ADD_like,
    payload: like,
  })