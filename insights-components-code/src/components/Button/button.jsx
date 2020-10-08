import React from 'react'
import '../../styles/tailwind.css'
import PropTypes from 'prop-types'
import './button.css'

export const Button = ({ type, size, width, children, click }) => {
  return (
    <main
      onClick={click}
      className='inline-flex shadow-sm sm:w-auto items-center select-none'
    >
      <button
        type='button'
        className={`inline-flex align-middle justify-center shadow-sm focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5 ${type} w-${width} ${size}`}
      >
        {children}
      </button>
    </main>
  )
}

Button.propTypes = {
  width: PropTypes.oneOf(['screen', 'auto']),
  size: PropTypes.oneOf(['sm', 'base', 'lg']),
  type: PropTypes.string.isRequired
}

Button.defaultProps = {
  type: 'light',
  size: 'base',
  width: 'auto'
}
