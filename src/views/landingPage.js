import { useState } from "react";
import "../styles/landingPage.styles.css";
import Appbar from "../components/Appbar";
import Home from "../components/Home";

function LandingPage() {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [modalName , setModalName] = useState("");

  function loginModalCallback(show) {
    setLoginModalShow(show);
  }

  function changeModalName (name) {
    setModalName(name);
  }

  return (
    <div className="landing-page">
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

export default LandingPage;
