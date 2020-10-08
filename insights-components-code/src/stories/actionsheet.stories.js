import React from 'react'

import { ActionSheet } from '../components/ActionSheet/actionsheet'
import { Button } from '../components/Button/button'

export default {
  title: 'ActionSheet',
  component: ActionSheet
}

export const DefaultActionSheet = () => (
  <ActionSheet>
    <Button key='button'>Click Me</Button>
    <a key='all'>Link 1</a>
    <a key='all'>Link 2</a>
  </ActionSheet>
)
