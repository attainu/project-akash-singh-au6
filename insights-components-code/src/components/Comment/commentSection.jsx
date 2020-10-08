import React from 'react'
import '../../styles/tailwind.css'

export const CommentSection = ({ children }) => {
  return (
    <section>
      {children.map((item) => (
        <section
          key={item}
          className='w-full my-2 rounded-full bg-gray-300 p-2 px-4 px-4'
        >
          <section>{item}</section>
        </section>
      ))}
    </section>
  )
}
