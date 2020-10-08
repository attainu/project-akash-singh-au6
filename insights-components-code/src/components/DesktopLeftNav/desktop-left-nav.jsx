import React from 'react'
import PropTypes from 'prop-types'
import './desktop-left-nav.css'
import '../../styles/tailwind.css'
import { Profile } from '../Profile/profile'

export const NavDesktopLeft = (props) => {
  const getComponent = (key) => {
    return props.children.filter((comp) => {
      return comp.key === key
    })
  }
  const { title, width, padding } = props
  return (
    <nav
      className={`hidden left md:flex w-1/4 flex-col bg-gray-100 text-sm text-gray-700 justify-between ${width} ${padding}`}
    >
      <section>
        <header className='bg-teal-700 flex items-center px-8 py-3 justify-between'>
          <section className='flex items-center'>
            <img
              src='https://www.flaticon.com/svg/static/icons/svg/92/92019.svg'
              className='w-6 h-6 mr-6 bg-white rounded-full text-white'
            />
            <h1 className='text-xl font-semibold text-white inline'>{title}</h1>
          </section>
          <Profile>{getComponent('profile')}</Profile>
        </header>
        <section className='padding mt-5'>{getComponent('all')}</section>
      </section>
      <section className='mb-5 padding'>{getComponent('footer')}</section>
    </nav>
  )
}

NavDesktopLeft.propTypes = {
  title: PropTypes.string,
  width: PropTypes.oneOf(['base', 'lg']),
  padding: PropTypes.oneOf(['none', 'default'])
}

NavDesktopLeft.defaultProps = {
  title: 'Title',
  width: 'base',
  padding: 'default'
}
