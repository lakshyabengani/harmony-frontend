import { useState } from "react";
import "../styles/landingPage.styles.css";
import Appbar from "../components/Appbar";
import Home from "../components/Home";
import { Redirect } from "react-router";

function LandingPage() {
    const [loginModalShow, setLoginModalShow] = useState(false);
    const [modalName, setModalName] = useState("");
    const [redirectPath, setRedirectPath] = useState("");

    function loginModalCallback(show) {
        setLoginModalShow(show);
    }

    function changeModalName(name) {
        setModalName(name);
    }

    function changeRedirectPath(path) {
        setRedirectPath(path);
    }

    return (
        <div className="landing-page">
            <Appbar
                loginModalCallback={loginModalCallback}
                changeModalName={changeModalName}
            />

            {/* TODO: Routing stuffs */}
            <Home
                loginModalShow={loginModalShow}
                modalName={modalName}
                loginModalCallback={loginModalCallback}
                changeModalName={changeModalName}
                changePath={changeRedirectPath}
            />
            {redirectPath ? <Redirect to={redirectPath} /> : null}
        </div>
    );
}

export default LandingPage;
