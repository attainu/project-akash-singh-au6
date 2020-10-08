import React from 'react'
import '../../styles/tailwind.css'
import './videoPreview.css'

export const VideoPreview = ({ thumbnailUrl, title, click }) => {
  return (
    <section
      id='thumbnail-container'
      className='w-64 h-40 cursor-pointer transition m-10 duration-500 hover:opacity-50 hover:bg-gray-500'
      onClick={click}
    >
      <img
        src={`${thumbnailUrl}`}
        className='h-full w-full p-1'
        alt='thumbnail'
      />
      <h6 className='p-2 font-semibold font-sans'>{title}</h6>
    </section>
  )
}
