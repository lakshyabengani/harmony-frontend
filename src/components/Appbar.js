import "../styles/appbar.style.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import { action } from "../config";

const Appbar = props => (
  <Navbar collapseOnSelect expand="lg">
    <Navbar.Brand href="#home">
      <span className="appbar-title text-white">Harmony</span>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto"></Nav>
      <Nav className="justify-content-end">
        <Nav.Link href="#privacy" className="appbar-subtitle text-white">
          Privacy
        </Nav.Link>
        <Nav.Link href="#about" className="appbar-subtitle text-white">
          About
        </Nav.Link>
        <Button variant="secondary">
          <span
            className="appbar-subtitle"
            onClick={() => { props.loginModalCallback(true); props.changeModalName(action.LOGIN) }}
          >
            LOG IN
          </span>
        </Button>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Appbar;
