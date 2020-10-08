import React from 'react'

import { Button } from '../components/Button/button'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    width: { control: { type: 'inline-radio', options: ['auto', 'screen'] } },
    size: { control: { type: 'inline-radio', options: ['sm', 'base', 'lg'] } },
    type: {
      control: {
        type: 'select',
        options: ['primary', 'success', 'danger', 'light', 'link'],
        default: 'light'
      }
    }
  }
}

const Template = (args) => <Button {...args}>Click Me</Button>

export const Primary = Template.bind({})
Primary.args = {
  width: 'auto',
  size: 'base',
  type: 'primary'
}
