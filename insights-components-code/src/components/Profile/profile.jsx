import React from 'react'
import '../../styles/tailwind.css'
import { ActionSheet } from '../ActionSheet/actionsheet'

export const Profile = ({ children }) => (
  <ActionSheet>
    <img
      src='https://www.flaticon.com/svg/static/icons/svg/2948/2948035.svg'
      key='button'
      className='bg-white rounded-full w-8 h-8 text-white'
    />
    <nav key='all' className='py-1'>
      {children}
    </nav>
  </ActionSheet>
)
