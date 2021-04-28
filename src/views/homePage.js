import {Row ,Col } from "react-bootstrap"
import HomeNavBar from "../components/HomeNavBar"

const HomePage = (props) => {
  return (
    <div>
    <HomeNavBar />
    <Row>
      <Col xs={10}>
        {
          //Swpieable Cards to be added here 
        }
      </Col>
      <Col xs={2}>
        {
          //SideBar should be added here 
        }
      </Col>
    </Row>
    </div>
  )
}

export default HomePage;