import React from 'react'

import { Modal } from '../components/Modal/modal'

export default {
  title: 'Modal/Default',
  component: Modal,
  argTypes: {
    mobileHeight: {
      control: { type: 'inline-radio', options: ['auto', 'full'] }
    }
  }
}

const Template = (args) => (
  <Modal {...args}>
    <section className='flex flex-col w-full'>{args.body}</section>
  </Modal>
)
export const DefaultModal = Template.bind({})
DefaultModal.args = {
  mobileHeight: 'auto',
  show: true,
  title: 'Hello',
  body: 'Modal Body'
}
