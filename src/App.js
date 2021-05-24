import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import LandingPage from "./views/landingPage";
import SignupPage from "./views/signupPage";
import HomePage from "./views/homePage";

function App() {
    const auth = useSelector((state) => state.auth.isLoggedIn);
    const ftu = useSelector((state) => state.auth.ftu);
    console.log(ftu +" " +auth);
    return (
        <BrowserRouter>
            {auth ? (
                <Switch>
                    <Route path="/settings">
                        <SignupPage />
                    </Route>
                    <Route exact path="/home">
                        <HomePage />
                    </Route>
                    {ftu ? <Redirect to="/settings" exact /> : <Redirect to="/home" exact />}
                </Switch>
            ) : (
                <Switch>
                    <Route exact path="/landing">
                        <div className="App">
                            <LandingPage />
                        </div>
                    </Route>
                    <Redirect to="/landing" exact />
                </Switch>
            )}
        </BrowserRouter>
    );
}

export default App;
