import React from 'react'
import ReactPlayer from 'react-player'
import './videoMain.css'

export const VideoMain = ({ ...props }) => {
  return (
    <div className='player-wrapper'>
      <ReactPlayer className='react-player' {...props} />
    </div>
  )
}
