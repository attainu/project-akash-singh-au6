import { createSelector } from 'reselect'

export const selectComment = (state) => state.comments

export const selectCurrentComment = createSelector(
  [selectComment],
  (comments) => comments.currentComment
)