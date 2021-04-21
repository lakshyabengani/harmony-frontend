import "../styles/home.style.css";
import { Button, Col, Container, Row } from "react-bootstrap";

import Login from "./Login.js";
import { action } from "../config";

const Home = props => (
  <Container className="pt-5">
    <Row className="mt-5 pt-5">
      <Col>
        <span className="home-title text-white">Find your rythm.</span>
      </Col>
    </Row>
    <Row>
      <Col>
        <Button variant="secondary" size="lg">
          <span onClick={() => {props.loginModalCallback(true) ; props.changeModalName(action.SIGNUP)}}>SIGN UP</span>
        </Button>
      </Col>
    </Row>
    <Login show={props.loginModalShow} onHide={props.loginModalCallback} modalName={props.modalName} changePath={props.changePath}/>
  </Container>
);

export default Home;
