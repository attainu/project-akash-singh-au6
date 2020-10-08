/* eslint-disable react/jsx-boolean-value */
import React from 'react'

import { VideoMain } from '../components/VideoMain/videoMain'

export default {
  title: 'Video/Main',
  component: VideoMain
}

export const DefaultVideoMain = () => (
  <VideoMain
    // Video link goes here
    url='https://www.youtube.com/watch?v=wfLOt5P6nSk'
    // Thumbnail image link goes here
    // light='https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg'
    controls={true}
  />
)
