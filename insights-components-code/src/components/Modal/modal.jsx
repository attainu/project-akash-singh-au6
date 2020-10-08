import React from 'react'
import PropTypes from 'prop-types'
import './modal.css'
import '../../styles/tailwind.css'

export const Modal = (props) => {
  const { show, close, title, mobileHeight } = props
  return (
    <section>
      {show ? (
        <main className='fixed bottom-0 w-full inset-x-0 sm:inset-0 sm:flex sm:items-center sm:justify-center'>
          <div className='fixed inset-0' onClick={close}>
            <div className='absolute inset-0 bg-gray-700 opacity-75' />
          </div>
          <section
            className={`bg-white rounded-t-lg overflow-hidden shadow-xl transform sm:max-w-lg sm:w-full sm:rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col ${mobileHeight}`}
            role='dialog'
          >
            <header className='flex justify-between w-full items-center'>
              <h1 className='text-xl font-semibold'>{title}</h1>
              <button
                className='hover:bg-gray-200 border-gray-200 rounded-full text-gray-800 py-2 px-4 items-center inline-flex'
                onClick={close}
              >
                <img
                  src='https://www.flaticon.com/svg/static/icons/svg/748/748122.svg'
                  className='fill-current w-4 h-4'
                />
              </button>
            </header>
            {props.children}
          </section>
        </main>
      ) : null}
    </section>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  mobileHeight: PropTypes.oneOf(['auto', 'full'])
}

Modal.defaultProps = {
  title: '',
  show: false,
  mobileHeight: 'auto'
}
