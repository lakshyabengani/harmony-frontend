import React from "react";
import { Row, Col,} from "react-bootstrap";
import HomeNavBar from "../components/HomeNavBar";
import "../styles/sidebar.style.css";
import SwipeDeck from "../components/swipeDeck";
import SideBar from "../components/SideBar";

const HomePage = (props) => {

    return (
        <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
            <HomeNavBar />
            <Row>
                <Col xs={9}>
                    <SwipeDeck />
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
                    <SideBar />
                </Col>
            </Row>
        </div>
    );
};

export default HomePage;
