import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100
  const publishableKey =
    'pk_test_51GxqeJLgFGfdIbJfPGflUggdtoAsKwb2nw6xprwpY8rewb0vbKn7io7T0Bbko9iLlf0C2EQ24EmmF2cmOJdEs5C1008Z90JaiV'

  const onToken = (token) => {
    console.log(token)
  }
  return (
    <StripeCheckout
      label='Pay Now'
      name='Insights Inc'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}
