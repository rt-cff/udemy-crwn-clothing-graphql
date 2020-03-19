import {gql} from 'apollo-boost'
import {addItemToCart, getItemCount} from './cart.utils'

export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }

    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
    }
`

const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`

const GET_CART_ITEM = gql`
    {
        cartItems @client
    }
`

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, _context, _info) => {
            const {cache} = _context
            const data = cache.readQuery({
                query: GET_CART_HIDDEN,
            })
            const {cartHidden} = data

            cache.writeQuery({
                query: GET_CART_HIDDEN, 
                data: {cartHidden: !cartHidden}
            })

            return !cartHidden
        }, 
        addItemToCart: (_root, _args, _context, _info) => {
            const {item} = _args, {cache} = _context
            
            const {cartItems} = cache.readQuery({
                query: GET_CART_ITEM,
            })

            const newCartItems = addItemToCart(cartItems, item)

            cache.writeQuery({
                query: GET_CART_ITEM, 
                data: {cartItems: newCartItems}
            })

            cache.writeQuery({
                query: GET_ITEM_COUNT, 
                data: {itemCount: getItemCount(newCartItems)}
            })

            return newCartItems
        }
   }, 
}