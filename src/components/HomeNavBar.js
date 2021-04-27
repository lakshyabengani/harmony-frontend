import { Navbar , Nav, NavItem ,Dropdown, NavLink, NavDropdown} from "react-bootstrap"
import "../styles/appbar.style.css";
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";


const HomeNavBar = (props) => {

  
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </a>
    ));

  return(
    <Navbar className="custom-carets" style={{backgroundColor: '#A04A4A'}}>
      <Navbar.Brand href="#home">
        <span className="appbar-title text-white">Harmony</span>
      </Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Nav className="justify-content-end">
        <Dropdown as={NavItem} drop="down">
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"><FontAwesomeIcon icon={faEllipsisV} /></Dropdown.Toggle>
          <Dropdown.Menu>
            
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  )
}

export default HomeNavBar