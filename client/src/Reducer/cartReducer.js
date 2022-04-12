

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                items: [...state.items, action.cartItem],
                totalItem: state.items.length + 1
            }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter((curE) => {
                    return curE.id !== action.playload
                }),
                totalItem: state.items.length - 1
            }
        default:
            return null

    }
}