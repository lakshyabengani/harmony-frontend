import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./views/landingPage";
import SignupPage from "./views/signupPage";
import DetailsPage from "./views/detailsPage";

function App() {
    return (
        <Switch>
            <Route exact path="/home">
                <div className="App">
                    <LandingPage />
                </div>
            </Route>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route path="/signup">
                <SignupPage />
            </Route>
            <Route path="/details">
                <DetailsPage />
            </Route>
        </Switch>
    );
}

export default App;
