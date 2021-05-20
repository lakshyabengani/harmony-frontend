import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import LandingPage from "./views/landingPage";
import SignupPage from "./views/signupPage";
import HomePage from "./views/homePage";

function App() {
    const auth = useSelector((state) => state.auth.isLoggedIn);

    return (
        <BrowserRouter>
            {auth ? (
                <Switch>
                    <Route path="/settings">
                        <SignupPage />
                    </Route>
                    <Route exact path="/swipeDeck">
                        <HomePage />
                    </Route>
                    <Redirect to="/swipedeck" exact />
                </Switch>
            ) : (
                <Switch>
                    <Route exact path="/signin">
                        <div className="App">
                            <LandingPage />
                        </div>
                    </Route>
                    <Redirect to="/signin" exact />
                </Switch>
            )}
        </BrowserRouter>
    );
}

export default App;
