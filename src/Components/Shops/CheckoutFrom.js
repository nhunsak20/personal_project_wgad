import React, { useEffect } from 'react'
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import StripeCheckout from 'react-stripe-checkout'
// import CardSection from './CardSection'

import './CardSectionStyles.css'

function CheckoutFrom(props) {
    // const stripe = useStripe()
    // const elements = useElements()

    useEffect(()=> {

    },[])

    const handleSubmit = async event => {
        
        event.preventDefault();

        // if(!stripe || !elements) return 

        // const card = elements.getElement(CardElement);
        // const result = await stripe.createToken(card);

        // if(result.error) {
        //     console.log(result.error.message)
        // } else {
        //     alert('Thank you for your purchase...')
        //     stripeTokenHandler.(result.token)
        // }


    }

    return (
        <from className='card-from' onSubmit={handleSubmit}>
            {/* <CardSection /> */}
            {/* <div className='card-from-buttons'>
                <button type='submit'>Confirm order</button>
            </div> */}
            <StripeCheckout />
        </from>
    )
}

// async function stripeTokenHandler(token) {
//     const paymentData = {token: token.id}
//     const response = await fetch('/charge', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(paymentData)
//     })

//     return response.json()
// }

// const stripeTokenHandler = Stripe


export default CheckoutFrom