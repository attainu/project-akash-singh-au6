import React from 'react'
import '../../styles/tailwind.css'
import './navMobile.css'

export const NavMobile = (props) => {
  const { children } = props
  return (
    <nav className='w-full md:hidden bg-gray-100 border-t border-gray-200 flex py-2'>
      {children}
    </nav>
  )
}
