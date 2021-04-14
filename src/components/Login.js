import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "../styles/Login.style.css";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = (props) => {
    const [loginForm, setLoginForm] = useState({ username: "", password: "" });

    const handleChange = (event) => {
        event.preventDefault();
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        if (loginForm.username.length > 0 && loginForm.password.length > 0) {
            alert("Form submitted");
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
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12}>
                            <Form>
                                <Form.Group controlId="username">
                                    <Form.Control
                                        type="text"
                                        placeholder="User name"
                                        onChange={handleChange}
                                        value={loginForm.username}
                                        onKeyPress={handleSubmitKeypress}
                                        name="username"
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
                        LOGIN USING GOOGLE
                    </Button>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default Login;
