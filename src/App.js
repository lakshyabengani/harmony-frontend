import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./views/landingPage";
import SignupPage from "./views/signupPage";
import HomePage from "./views/homePage"

// test 1
// test 2

function App() {
  
  return (
    <Switch>
         <div></div>
      <Route exact path="/home">
        <div className="App">
          <LandingPage />
        </div>
      </Route>
      <Route exact path='/'>
        <Redirect to='/home' />
      </Route>
      <Route path='/signup'>
        <SignupPage />
      </Route>
      <Route exact path='/swipeDeck'>
        <HomePage />
      </Route>
    </Switch>
  );
}

export default App;
