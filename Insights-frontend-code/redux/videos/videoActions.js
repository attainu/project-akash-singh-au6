import { videoActionTypes } from './videoActionTypes'

export const getAllVideos = (video) => ({
  type: videoActionTypes.GET_CURRENT_VIDEO,
  payload: video,
})

export const uploadVideo = (video) => ({
    type: videoActionTypes.UPLOAD_VIDEO,
    payload: video,
  })
