import React from 'react'
import {Mutation, Query} from 'react-apollo'
import {gql} from 'apollo-boost'

import CartDropdown from './cart-dropdown.component'

const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`

const CartDropdownContainer = () => (
    <Mutation mutation = {TOGGLE_CART_HIDDEN}>
        {
            toggleCartHidden => (
                <Query query = {GET_CART_ITEMS}>
                    {
                        ({data: {cartItems}}) => (
                            <CartDropdown toggleCartHidden = {toggleCartHidden} cartItems = {cartItems}/>
                        )
                    }
                </Query>
            )
        }
    </Mutation>
)

export default CartDropdownContainer