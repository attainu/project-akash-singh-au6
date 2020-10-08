import React from 'react'
import '../../styles/tailwind.css'
import PropTypes from 'prop-types'
import './header.css'

export const Header = ({ title, children, click }) => (
  <header className='flex justify-between bg-indigo-700 pt-5 pb-2 text-white md:bg-white md:text-gray-800'>
    <h1 className='text-2xl font-semibold' onClick={click}>
      {title}
    </h1>
    <div className='flex justify-evenly'>{children}</div>
  </header>
)

Header.propTypes = {
  title: PropTypes.string
}

Header.defaultProps = {
  title: ''
}
