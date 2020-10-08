import React from 'react'

import { VideoPreview } from '../components/VideoPreview/videoPreview'

export default {
  title: 'Video/Preview',
  component: VideoPreview
}

export const DefaultVideoPreview = () => (
  <VideoPreview
    thumbnailUrl='https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg'
    title='This is a test video some other video title may be here'
  />
)
