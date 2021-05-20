/* eslint-disable no-unused-vars */
import {
    Navbar,
    Nav,
    NavItem,
    Dropdown,
    NavLink,
    NavDropdown,
    Image,
} from "react-bootstrap";
import "../styles/homeBar.style.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCog,
    faEllipsisV,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const HomeNavBar = (props) => {
    const history = useHistory();

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href="#toggle"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </a>
    ));

    return (
        <Navbar
            className="custom-carets"
            style={{ backgroundColor: "#A04A4A" }}
        >
            <Navbar.Brand href="#home">
                <span className="appbar-title text-white">Harmony</span>
            </Navbar.Brand>
            <Nav className="mr-auto"></Nav>
            <Nav className="justify-content-end">
                <div className="container" style={{ padding: "5px" }}>
                    <Image
                        src="https://i.pinimg.com/564x/0c/40/c4/0c40c4f9c2f12c03b4e3fd541fae52ee.jpg"
                        roundedCircle
                        width="72px"
                        height="72px"
                    />
                    <Nav.Item>
                        <span className="appbar-subtitle text-white">
                            Rohit
                        </span>
                    </Nav.Item>
                    <Dropdown as={NavItem}>
                        <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                            style={{ padding: "10px" }}
                        >
                            <FontAwesomeIcon
                                icon={faEllipsisV}
                                size="2x"
                                pull="right"
                                color="white"
                            />
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="right">
                            <Dropdown.Item
                                className="appbar-options"
                                onClick={() => history.push("/settings")}
                            >
                                <FontAwesomeIcon icon={faCog} />
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item className="appbar-options">
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Nav>
        </Navbar>
    );
};

export default HomeNavBar;
