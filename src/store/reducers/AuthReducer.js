const AuthReducer = (state = { isLoggedIn: false }, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return { ...state, isLoggedIn: action.payload };
        case "SIGN_OUT":
            return { ...state, isLoggedIn: action.payload };
        default:
            return state;
    }
};

export { AuthReducer };
