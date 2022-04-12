import React, { createContext, useReducer } from 'react'
import { cartReducer } from "../Reducer/cartReducer.js";

export const cartContext = createContext()

const CartContextApi = ({ children }) => {

    const initialState = {
        items: [],
        totalItem: 0
    }

    const [cartState, cartDispatch] = useReducer(cartReducer, initialState) 

    return (
        <cartContext.Provider value={{ cartState, cartDispatch }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartContextApi