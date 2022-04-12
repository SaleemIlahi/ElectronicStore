
export const reducer = (state, action) => {
    if (action.type === "login") {
        return action.userDetail
    } else if (action.type === "logout") {
        return null
    }
}

