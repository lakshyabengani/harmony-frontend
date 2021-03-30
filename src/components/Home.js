import "../styles/home.style.css";
import { Button, Col, Container, Row } from "react-bootstrap";

const Home = () => (
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
  </Container>
);

export default Home;
