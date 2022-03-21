
export const reducer = (state, action) => {
    if (action.type === "login") {
        return action.payload
    } else if (action.type === "logout") {
        return action.payload
    }
}

