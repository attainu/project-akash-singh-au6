import React from 'react'

import { Header } from '../components/Header/header'

export default {
  title: 'Header',
  component: Header
}

const Template = (args) => <Header {...args}>Components go here</Header>

export const DefaultHeader = Template.bind({})

DefaultHeader.args = {
  title: 'Hello I am Header Component'
}
