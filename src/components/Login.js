import { Modal, Row, Col, Button, Container } from "react-bootstrap";
import "../styles/Login.style.css";

const Login = props => {
  return (
    <Modal show={props.show} onHide={() => props.onHide(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <span>LOG IN</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Row>
            <Col>
              <Button variant="primary" className="login-btn">
                LOG IN WITH EMAIL
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" className="login-btn">
                LOG IN WITH GOOGLE
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" className="login-btn">
                LOG IN WITH FACEBOOK
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
