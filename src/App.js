import { useState } from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import Home from "./components/Home";

function App() {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const loginModalCallback = show => {
    setLoginModalShow(show);
  };

  return (
    <div className="App">
      <Appbar loginModalCallback={loginModalCallback} />

      {/* TODO: Routing stuffs */}
      <Home
        loginModalShow={loginModalShow}
        loginModalCallback={loginModalCallback}
      />
    </div>
  );
}

export default App;
