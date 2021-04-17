import { useState } from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import Home from "./components/Home";

function App() {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [modalName , setModalName] = useState("");

  function loginModalCallback(show) {
    setLoginModalShow(show);
  }

  function changeModalName (name) {
    setModalName(name);
  }

  return (
    <div className="App">
      <Appbar loginModalCallback={loginModalCallback} changeModalName={changeModalName}/>

      {/* TODO: Routing stuffs */}
      <Home
        loginModalShow={loginModalShow}
        modalName={modalName}
        loginModalCallback={loginModalCallback}
        changeModalName={changeModalName}
      />
    </div>
  );
}

export default App;
