import React from 'react'
import {Mutation, Query, graphql} from 'react-apollo'
import {gql} from 'apollo-boost'

import flowRight from 'lodash/flowRight'

import CartIcon from './cart-icon.component'

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`

// const CartIconContainer = () => (
//     <Mutation mutation = {TOGGLE_CART_HIDDEN}>
//         {
//             toggleCartHidden => 
//                 <Query query = {GET_ITEM_COUNT}>
//                     {
//                         ({loading, error, data}) => (
//                             <CartIcon 
//                                 toggleCartHidden = {toggleCartHidden}
//                                 itemCount = {data.itemCount}
//                             />)
//                     }
//                 </Query>
//         }
//     </Mutation>
// )

const CartIconContainer = ({toggleHidden: toggleCartHidden, data: {itemCount}}) => (
    <CartIcon 
    toggleCartHidden = {toggleCartHidden}
    itemCount = {itemCount}
/>)

export default flowRight([
    graphql(GET_ITEM_COUNT), 
    graphql(TOGGLE_CART_HIDDEN, {name: 'toggleHidden'}), 
])(CartIconContainer)