import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import LandingPage from "./views/landingPage";
import SignupPage from "./views/signupPage";
import HomePage from "./views/homePage";

function App() {
    const auth = useSelector((state) => state.auth.isLoggedIn);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <div className="App">
                        <LandingPage />
                    </div>
                </Route>
                <Route path="/settings">
                    <SignupPage />
                </Route>
                <Route exact path="/swipeDeck">
                    <HomePage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
