import React from 'react'
import './cards.css'
import '../../styles/tailwind.css'
import { StripeCheckoutButton } from '../StripeButton/stripe'

export class Card extends React.Component {
  getComponent = (key) => {
    return this.props.children.filter((comp) => {
      return comp.key === key
    })
  }

  render() {
    const { title, price } = this.props

    return (
      <section className='h-auto card bg-blue-100'>
        <header className='p-10 flex justify-center'>
          <h2 className='text-2xl'>{title}</h2>
        </header>
        <section className='p-10 overflow-hidden'>
          <h2 className='text-lg'>Features</h2>
          {this.getComponent('all')}
        </section>
        <section className='flex p-10 justify-center'>
          <StripeCheckoutButton price={price} />
        </section>
      </section>
    )
  }
}
