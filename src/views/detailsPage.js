import React, { useState } from "react";
import {
    Container,
    Navbar,
    Row,
    Col,
    Button,
    Badge,
    OverlayTrigger,
    Tooltip,
    Modal,
    Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/detailsPage.style.css";
import { passion } from "../config";

const DetailsPage = () => {
    const imgBody = { imageInfo: null };

    const [pics, setPics] = useState([
        imgBody,
        imgBody,
        imgBody,
        imgBody,
        imgBody,
        imgBody,
        imgBody,
        imgBody,
        imgBody,
    ]);
    const [retrievedPassion, setRetrievedPassion] = useState(passion);
    const [passions, setPassions] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const imageHandler = (i, event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                let temp = [...pics];
                temp[i] = reader.result;
                setPics(temp);
            }
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const addPassions = (value) => {
        let temp = [...retrievedPassion];
        let index = temp.indexOf(value);
        temp.splice(index, 1);
        setRetrievedPassion(temp);
    };

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
                <h2 class="container-title">Add picture</h2>
                <Row>
                    {pics.map((el, idx) => {
                        return (
                            <Col xs={12} md={6} lg={4}>
                                <div
                                    style={{
                                        border: "1px solid #ccc",
                                        height: "300px",
                                        width: "200px",
                                        borderRadius: "16px",
                                        marginBottom: "40px",
                                        backgroundImage:
                                            "url(https://picaflor-azul.com/images/plus-circle1.png)",
                                        backgroundRepeat: "round",
                                    }}
                                    onClick={() => console.log("clicked")}
                                >
                                    {/* <input
                                        type="file"
                                        name="image-upload"
                                        accept="image/*"
                                        onChange={(event) => {
                                            imageHandler(idx, event);
                                        }}
                                    /> */}
                                    <Button
                                        variant="dark"
                                        style={{
                                            borderRadius: "100%",
                                            position: "absolute",
                                            bottom: 40,
                                            zIndex: 10,
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
            <Container fluid="sm" className="formContainer">
                <h2 class="container-title">Add passions</h2>
                <Row>
                    <Col xs={6} md={3}>
                        {passions.map((el) => {
                            return (
                                <Badge
                                    pill
                                    style={{
                                        fontSize: "1.2rem",
                                        backgroundColor: "#E3E3E3",
                                    }}
                                >
                                    {el}
                                    <span
                                        style={{ paddingLeft: 10 }}
                                        onClick={() => {
                                            console.log("ok");
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </Badge>
                            );
                        })}
                        <OverlayTrigger
                            placement={"top"}
                            overlay={<Tooltip>Add passions</Tooltip>}
                        >
                            <Button
                                size="lg"
                                variant="dark"
                                style={{
                                    borderRadius: "20%",
                                }}
                                onClick={() => {
                                    handleShow();
                                }}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </OverlayTrigger>
                    </Col>
                </Row>
            </Container>

            {/* Modal to add passions */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control as="select" custom>
                            {retrievedPassion.map((el) => {
                                return <option>{el}</option>;
                            })}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DetailsPage;
