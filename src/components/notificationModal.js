import React from "react";
import { ListGroup , Modal,Row,Col} from "react-bootstrap";

const NotificationModal = (props) => {

  const renderNotifications = () =>{
    // console.log(props.show);
    let list = null;
    if(props.list.length === 0)
      list = <ListGroup.Item variant='light'>No Notifications to Display</ListGroup.Item>
    else{
      list = props.list.map( notif => 
        <ListGroup.Item
          action
          active={false}
          variant='primary'
        >
        <span>
          <b>{notif.messsage}</b>
          <br/>
          {notif.from_name}
        </span>
        </ListGroup.Item>
      )
    }
    return <ListGroup>{list}</ListGroup>
  }

  return(
    <React.Fragment>
      <Modal
        show={props.show}
        onHide={() => props.onHide(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable = {true}
      >
        <Modal.Header closeButton className="text-center">
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '60vh'}}>
          <Row>
            <Col xs={12}>
              {renderNotifications()}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default NotificationModal;
