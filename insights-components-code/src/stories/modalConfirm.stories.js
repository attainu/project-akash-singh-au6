import React from 'react'

import { ModalConfirm } from '../components/ModalConfirm/modalConfirm'

export default {
  title: 'Modal/Confirm',
  component: ModalConfirm
}

const Template = (args) => <ModalConfirm {...args} />
export const Confirm = Template.bind({})
Confirm.args = {
  show: true
}
