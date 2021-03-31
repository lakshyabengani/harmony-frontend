import "../styles/home.style.css";
import { Button, Col, Container, Row } from "react-bootstrap";

import Login from "./Login.js";

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
          <span>SIGN UP</span>
        </Button>
      </Col>
    </Row>
    <Login show={props.loginModalShow} onHide={props.loginModalCallback} />
  </Container>
);

export default Home;
