import React, { useState } from "react";
import { Form,Modal ,Row ,Col, ListGroup, InputGroup,} from "react-bootstrap";
import { passions } from "../config";

const PassionModal = (props) => {

  const [searchText,setSearchText] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const text = event.target.value ;
    setSearchText(text);
  } 

  const renderOptions = () => {

    const selected = props.selectedList;
    const defaultList = passions.filter( word => word.toLowerCase().includes(searchText.toLowerCase())); 
    let options = null;
    console.log(defaultList.length)
    if(defaultList.length === 0){
      console.log("here")
      options = <ListGroup.Item variant="light">No Items to Match your Choice :( </ListGroup.Item>
    } 
    else{
      options = defaultList.map( (ele,idx) => 
      <ListGroup.Item 
        action 
        active={selected.includes(ele)} 
        variant="primary"
        onClick={() =>  selected.includes(ele) ? props.removeFromList(ele) : props.addToList(ele) } 
        key={idx}
      >
        {ele}
      </ListGroup.Item>);
    }
    return <ListGroup>{options}</ListGroup>
  }

  return(
    <React.Fragment>
      <Modal 
        show={props.show}
        onHide={() => { props.onHide(false); setSearchText("") }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Header closeButton className="text-center">
          <Modal.Title>Passions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <InputGroup as={Col} className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search Passions"
                name="serachText"
                value={searchText}
                onChange={handleChange}
              />
            </InputGroup>
          </Row>
          <Row>
            <Col xs={12}>
              {renderOptions()}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default PassionModal;
