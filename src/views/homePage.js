import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Row, Col, Form, InputGroup, Image } from "react-bootstrap";
import HomeNavBar from "../components/HomeNavBar";
import { msgList } from "../config";
import "../styles/sidebar.style.css";

import TinderCards from "../components/TinderCards";

const HomePage = (props) => {
    const [msgData, setMsgData] = useState(msgList);
    const [msgFilter, setMsgFilter] = useState(msgList);

    const searchMessage = (text) => {
        const searchedMessages = msgFilter.filter((msg) => {
            let searchTerm = text.toLowerCase();
            let msgLowerCase = msg.name.toLowerCase();

            return msgLowerCase.toString().indexOf(searchTerm) > -1;
        });
        setMsgData(searchedMessages);
    };

    return (
        <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
            <HomeNavBar />
            <Row>
                <Col xs={9} style={{ height: "88vh" }}>
                    {
                        <TinderCards />
                        //Swpieable Cards to be added here
                    }
                </Col>
                <Col
                    xs={3}
                    style={{
                        borderLeft: "thin solid #000",
                        paddingRight: 30,
                        top: 99,
                        bottom: 0,
                        right: 0,
                        position: "fixed",
                        width: "500px",
                    }}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                    >
                        Matches
                    </h2>
                    <Form.Group controlId="searchBox">
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                    }}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                style={{ borderRadius: 15 }}
                                onChange={(e) => {
                                    searchMessage(e.target.value);
                                }}
                            />
                        </InputGroup>
                    </Form.Group>
                    <div className="msg-tile">
                        {msgData.map((el, idx) => {
                            return (
                                <Row
                                    key={idx}
                                    style={{
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                    }}
                                >
                                    <Col xs={3}>
                                        <Image
                                            src={el.image}
                                            roundedCircle
                                            height={75}
                                            width={75}
                                        />
                                    </Col>
                                    <Col xs={9}>
                                        <Row>{el.name}</Row>
                                    </Col>
                                </Row>
                            );
                        })}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default HomePage;
