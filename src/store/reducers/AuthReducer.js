const login = localStorage.getItem('isLoggedIn');
const fUser = localStorage.getItem('ftu');
const AuthReducer = (state = { isLoggedIn: login ? login : false , ftu : fUser ? fUser : false}, action) => {
    switch (action.type) {
        case "SIGN_IN":
            localStorage.setItem('isLoggedIn',true);
            return { ...state, isLoggedIn: action.payload };
        case "SIGN_OUT":
            localStorage.clear();
            sessionStorage.clear();
            return { isLoggedIn: action.payload , ftu : action.payload};
        case "SIGN_UP":
            localStorage.setItem('isLoggedIn',true);
            localStorage.setItem('ftu',true);
            return { isLoggedIn: action.payload , ftu : true }
        default:
            return state;
    }
};

export { AuthReducer };
