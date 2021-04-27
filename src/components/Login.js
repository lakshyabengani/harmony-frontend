import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "../styles/Login.style.css";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {action} from '../config'
import { loginApi, signupApi } from "../api/backend";

const Login = (props) => {
    const [loginForm, setLoginForm] = useState({ email: "", password: "" , retypePassword: ""});

    const handleChange = (event) => {
        event.preventDefault();
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
    };

    const postSubmitAction = (path,error) => {
        setLoginForm({email: "" , password: "" , retypePassword: ""});
        props.onHide(false);
        if(error) alert(error);
        else props.changePath(path)
    } 

    const handleSubmit = () => {
        if (loginForm.email.length > 0 && loginForm.password.length > 0) {
            if(props.modalName === action.SIGNUP && loginForm.password !== loginForm.retypePassword){
                alert("Passwords do not match");
                setLoginForm({ ...loginForm, retypePassword: "" });
                return;
            }
            if(props.modalName === action.SIGNUP ){
                signupApi(loginForm.email,loginForm.password)
                    .then( (res) => {
                        console.log(res);
                        postSubmitAction('/signup',res.error);
                    })
                    .catch(err => console.log(err));
            }
            else{
                loginApi(loginForm.email,loginForm.password)
                .then((res) => {
                    console.log(res);
                    postSubmitAction('/home',res.error);
                })
                .catch(err => console.log(err));
            }
        }
        else{
            alert("Both username and password needs to be filled");
        }
    };

    const handleSubmitKeypress = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <React.Fragment>
            <Modal
                show={props.show}
                onHide={() => props.onHide(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="text-center">
                    <Modal.Title>{props.modalName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12}>
                            <Form>
                                <Form.Group controlId="username">
                                    <Form.Control
                                        type="text"
                                        placeholder="Email ID"
                                        onChange={handleChange}
                                        value={loginForm.email}
                                        onKeyPress={handleSubmitKeypress}
                                        name="email"
                                    />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        value={loginForm.password}
                                        name="password"
                                        onKeyPress={handleSubmitKeypress}
                                    />
                                </Form.Group>
                                {props.modalName === action.SIGNUP &&
                                    <Form.Group controlId="retypePassword">
                                        <Form.Control
                                            type="text"
                                            placeholder="Retype Password"
                                            onChange={handleChange}
                                            value={loginForm.retypePassword}
                                            name="retypePassword"
                                            onKeyPress={handleSubmitKeypress}
                                        />
                                    </Form.Group>
                                }
                            </Form>
                        </Col>
                    </Row>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        block
                        style={{ borderRadius: 20 }}
                    >
                        SUBMIT
                    </Button>
                    <div className="buttonText">
                        <p>OR</p>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        block
                        variant="light"
                        style={{ borderRadius: 20 }}
                    >
                        <FontAwesomeIcon icon={faGoogle} pull="left" />
                        {props.modalName} USING GOOGLE
                    </Button>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default Login;
