import { createSelector } from 'reselect'

export const selectVideos = (state) => state.videos

export const selectCurrentVideo = createSelector(
  [selectVideos],
  (video) => video.currentVideo
)
