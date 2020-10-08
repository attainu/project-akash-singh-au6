import React from 'react'

import { Profile } from '../components/Profile/profile'

export default {
  title: 'Profile',
  component: Profile
}

export const DefaultProfile = () => (
  <div className='bg-teal-700 px-8 py-3'>
    <Profile />
  </div>
)
