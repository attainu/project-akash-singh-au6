import { commentActionTypes } from './commentActionTypes'

export const getAllComments = (comment) => ({
  type: commentActionTypes.GET_CURRENT_COMMENT,
  payload: comment,
})

export const AddComment = (comment) => ({
    type: commentActionTypes.ADD_COMMENT,
    payload: comment,
  })