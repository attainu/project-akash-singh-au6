import React from 'react'
import '../../styles/tailwind.css'

export const CommentBox = () => {
  return (
    <textarea className='h-32 p-2 line-height-1 w-full font-mono resize-none overflow-scroll border-gray-200 border-2 text-justify' />
  )
}
