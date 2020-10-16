import { createSelector } from 'reselect'

export const selectLike = (state) => state.likes

export const selectCurrentLike = createSelector(
  [selectLike],
  (likes) => likes.currentLike
)