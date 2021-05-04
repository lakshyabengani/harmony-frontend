import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import "../styles/sidebar.style.css";
import { msgList } from "../config";
import { useState } from "react";

const SideBar = props =>{

  const [msgData, setMsgData] = useState(msgList);

  const searchMessage = (text) => {
    const searchedMessages = msgList.filter((msg) => {
      let searchTerm = text.toLowerCase();
      let msgLowerCase = msg.name.toLowerCase();

      return msgLowerCase.toString().indexOf(searchTerm) > -1;
    });
    setMsgData(searchedMessages);
  };


  return(
    <>
      <span className='sidebar-title'>
        <h2>Matches</h2>
      </span>
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
    </>
  )
}

export default SideBar;