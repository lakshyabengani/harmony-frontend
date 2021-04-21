import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./views/landingPage";
import SignupPage from "./views/signupPage";

function App() {
  
  return (
    <Switch>
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
    </Switch>
  );
}

export default App;
