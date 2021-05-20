import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./views/landingPage";
import SignupPage from "./views/signupPage";
import HomePage from "./views/homePage";

function App() {
    return (
        <Switch>
            <Route exact path="/home" component={LandingPage} />
            <Route path="/settings" component={SignupPage} exact />
            <Route exact path="/swipeDeck" component={HomePage} />
        </Switch>
    );
}

export default App;
