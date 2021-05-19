import React, { useState } from "react";
import { Form,Modal ,Row ,Col, ListGroup, InputGroup,} from "react-bootstrap";

const PassionModal = (props) => {

  const [searchText,setSearchText] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const text = event.target.value ;
    setSearchText(text);
  } 

  const renderOptions = () => {

    // this list will consist of selected passion id only 
    const selected = props.selectedList;

    // this list will contain a lists of all passions including name and id
    const passions = props.passion_list;

    // searched passions
    const defaultList = passions.filter( word => word.passion_name.toLowerCase().includes(searchText.toLowerCase())); 
    
    let options = null;
    if(defaultList.length === 0){
      options = <ListGroup.Item variant="light">No Items to Match your Choice :( </ListGroup.Item>
    } 
    else{
      options = defaultList.map( (ele,idx) => 
      <ListGroup.Item 
        action 
        active={selected.includes(ele.passion_id)} 
        variant="primary"
        onClick={() =>  selected.includes(ele.passion_id) ? props.removeFromList(ele.passion_id) : props.addToList(ele.passion_id) } 
        key={idx}
      >
        {ele.passion_name}
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
        scrollable = {true}
      >
        <Modal.Header closeButton className="text-center">
          <Modal.Title>Passions</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '60vh'}}>
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
