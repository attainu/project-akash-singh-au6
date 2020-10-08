import React from 'react'
import PropTypes from 'prop-types'
import '../../styles/tailwind.css'
import { Modal } from '../Modal/modal'
import { Button } from '../Button/button'

export const ModalConfirm = (props) => {
  const { title, show, message, close } = props
  return (
    <Modal show={show}>
      <div className='bg-white -mt-6 pb-4 sm:pb-4 sm:flex sm:items-start'>
        <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
          <img
            src='https://as1.ftcdn.net/jpg/02/69/66/02/500_F_269660263_wICqesonYg9VCcNiVnFzEhmuTWCyeu4Q.jpg'
            className='fill-current w-6 h-6 rounded-full'
          />
        </div>
        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            {title}
          </h3>
          <div className='mt-4'>
            <p className='text-sm leading-5 text-gray-500'>{message}</p>
          </div>
        </div>
      </div>
      <div className='py-3 flex flex-col-reverse justify-evenly sm:flex-row sm:self-end sm:w-1/2'>
        <Button className='sm:w-1/3' click={close}>
          Cancel
        </Button>
        <Button type='danger' className='mb-3 sm:ml-4 sm:w-1/3 sm:mb-0'>
          Delete
        </Button>
      </div>
    </Modal>
  )
}

ModalConfirm.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  message: PropTypes.string
}

ModalConfirm.defaultProps = {
  title: 'Delete',
  show: false,
  message: 'Do you want to delete? This cannot be undone.'
}
