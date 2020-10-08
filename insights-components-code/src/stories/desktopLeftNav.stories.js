import React from 'react'
import { NavDesktopLeft } from '../components/DesktopLeftNav/desktop-left-nav'

export default {
  title: 'Navigation/DesktopLeft',
  component: NavDesktopLeft
}

export const DefaultNavDesktopLeft = () => (
  <NavDesktopLeft>
    <ul key='all'>
      <a>
        <li>Navigation</li>
      </a>
    </ul>
    <a key='footer'>Footer</a>
  </NavDesktopLeft>
)
