import React from 'react'
import { Card } from '../components/Cards/cards'

export default {
  title: 'Card',
  component: Card
}

export const DefaultCard = () => (
  <Card title='Card' price={200}>
    <a>Some</a>
    <a>Some</a>
  </Card>
)
