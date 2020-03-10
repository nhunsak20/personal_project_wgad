import React, { useState }from 'react'
import { connect } from 'react-redux'

import './Checkout.scss'

function Checkout(props) {
    const [carts] = useState([props.carts])

    const cancelClicked = () => {
        props.history.push('/shops')
    }

    const cartLists = carts.map((cart, i) => {
        return (
            <div key={i}>{cart}</div>
        )
    })

    return (
        <div className='checkout'>
            <div className='checkout-container'>
                <div className='checkout-header'>
                    <h2>Checkout:</h2>
                    <p>price: $</p>
                </div>
                <div className='checkout-cart-lists'>{cartLists}</div>
                <div className='checkout-buttons'>
                    <button onClick={cancelClicked}>cancel</button>
                    <button>pay</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = reduxState => {
    const { carts } = reduxState.cart
    return {
        carts
    }
}

export default connect(mapStateToProps)(Checkout)
