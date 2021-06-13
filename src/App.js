import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import LandingPage from "./views/landingPage";
import Chats from "./components/chatbox"
import SignupPage from "./views/signupPage";
import HomePage from "./views/homePage";

function App() {
    const auth = useSelector((state) => state.auth.isLoggedIn);
    const ftu = useSelector((state) => state.auth.ftu);
    // console.log(ftu +" " +auth);
    return (
      <BrowserRouter>
        {auth ? (
          <Switch>
            <Route path="/settings" render={() => <SignupPage />} />
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route exact path="/messages">
              <Chats/>
            </Route>
            {ftu ? (
              <Redirect to="/settings" exact />
            ) : (
              <Redirect to="/home" exact />
            )}
            <Route exact path="/landing">
              <Redirect to="/home" />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <Redirect to="/landing" exact />
            </Route>
            <Route exact path="/landing">
              <div className="App">
                <LandingPage />
              </div>
            </Route>
            <Route exact path="/settings">
              <Redirect to="/landing" exact />
            </Route>
            <Redirect to="/landing" exact />
          </Switch>
        )}
      </BrowserRouter>
    );
}

export default App;
