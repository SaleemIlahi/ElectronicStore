import React, { createContext, useReducer } from 'react'
import { reducer } from "../Reducer/authReducer.js";

export const context = createContext()

const Context = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, false) 

    return (
        <context.Provider value={{ state, dispatch }}>
            {children}
        </context.Provider>
    )
}

export default Context