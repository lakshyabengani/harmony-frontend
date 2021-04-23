import React from "react";
import { Container, Navbar, Row, Col, Image, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/detailsPage.style.css";

const DetailsPage = () => {
    return (
        <div>
            <Container>
                <Navbar>
                    <Navbar.Brand>
                        <span className="page-title">Harmony</span>
                    </Navbar.Brand>
                </Navbar>
            </Container>
            <Container fluid="sm" className="formContainer">
                <Row>
                    <Col xs={12} md={6} lg={4}>
                        <div></div>
                        <Image
                            src="https://loremflickr.com/640/360"
                            height="350px"
                            width="250px"
                            style={{ borderRadius: 20 }}
                        />
                        <Button variant="dark" style={{ borderRadius: "100%" }}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DetailsPage;
