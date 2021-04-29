import {Row ,Col } from "react-bootstrap"
import HomeNavBar from "../components/HomeNavBar"

import React from 'react';
import TinderCards from "../components/TinderCards";


const HomePage = (props) => {
  return (
    <div>
    <HomeNavBar />
    <Row>
      <Col xs={8}>
        {
          <TinderCards />
          //Swpieable Cards to be added here 
        }
      </Col>
      <Col xs={4}>
        {
          //SideBar should be added here 
        }
      </Col>
    </Row>
    </div>
  )
}

export default HomePage;