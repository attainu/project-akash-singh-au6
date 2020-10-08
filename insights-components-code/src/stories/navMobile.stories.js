import React from 'react'

import { NavMobile } from '../components/NavMobile/navMobile'

export default {
  title: 'Navigation/MobileNav',
  component: NavMobile
}

export const DefaultNavMobile = () => (
  <NavMobile>
    <a to='/'>A</a>
    <a to='/'>B</a>
  </NavMobile>
)
