const AuthReducer = (state = { isLoggedIn: false , ftu : false}, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return { ...state, isLoggedIn: action.payload };
        case "SIGN_OUT":
            return { ...state, isLoggedIn: action.payload };
        case "SIGN_UP":
            return { isLoggedIn: action.payload , ftu : true }
        default:
            return state;
    }
};

export { AuthReducer };
