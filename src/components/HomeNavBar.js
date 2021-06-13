/* eslint-disable no-unused-vars */
import { Navbar, Nav, NavItem, Dropdown, Image } from "react-bootstrap";
import "../styles/homeBar.style.css";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCog,
    faEllipsisV,
    fas,
    faComments,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { singOut } from "../store/actions/AuthActions";
import { getProfileAPi } from "../api/backend";
import { faBell } from "@fortawesome/free-regular-svg-icons";

const HomeNavBar = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const logoutFn = () => {
        dispatch(singOut());
    };

    const [userDetail,setUserDetail] = useState({ name : '' , img_src : ''});

    useEffect(()=>{
        // console.log(localStorage.getItem('public_user_id'));
        getProfileAPi(localStorage.getItem('public_user_id'))
        .then(res => {
            // console.log(res);
            setUserDetail({name : res.data.user_data.name , img_src : res.data.user_data.images[0].img_src});
            localStorage.setItem(
              "img_src",
              res.data.user_data.images[0].img_src
            );
        })
        .catch(errObj => {
        // console.log(errObj)
        })
    },[])

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
      <Navbar className="custom-carets" style={{ backgroundColor: "#A04A4A" }}>
        <Navbar.Brand href="#home">
          <span className="appbar-title text-white">Harmony</span>
        </Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Nav className="justify-content-end">
          <div className="container" style={{ padding: "5px" }}>
            <Image
              src={userDetail.img_src}
              roundedCircle
              width="72px"
              height="72px"
              onClick={() => {
                props.setId(localStorage.getItem("public_user_id"));
                props.setShow(true);
              }}
            />
            <Nav.Item>
              <span className="appbar-subtitle text-white">
                {userDetail.name}
              </span>
            </Nav.Item>
            <Nav.Item
              style={{ padding: "10px" }}
              onClick={() => {
                props.notifyShow(true);
              }}>
              <FontAwesomeIcon icon={faBell} size="2x" color="white" />
            </Nav.Item>
            <Dropdown as={NavItem}>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
                style={{ padding: "10px" }}>
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
                  onClick={() => history.push("/settings")}>
                  <FontAwesomeIcon icon={faCog} />
                  Settings
                </Dropdown.Item>
                <Dropdown.Item
                  className="appbar-options"
                  onClick={() => history.push("/messages")}>
                  <FontAwesomeIcon icon={faComments} />
                  Messages
                </Dropdown.Item>
                <Dropdown.Item
                  className="appbar-options"
                  onClick={() => {
                    logoutFn();
                  }}>
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
