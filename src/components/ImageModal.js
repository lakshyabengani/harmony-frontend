import React, {useState} from "react";
import { Modal, Row, Col, ListGroup, Button, Container } from "react-bootstrap";
import { storage } from "../firebase";
import "../styles/ImageModal.style.css"

const ImageModal = (props) => {

  const [Images, setImages] = useState([
    {
      id: 1,
      ref:null,
      src:"",
    },
    {
      id: 2,
      ref:null,
      src:"",
    },
    {
      id: 3,
      ref:null,
      src:"",
    },
    {
      id: 4,
      ref:null,
      src:"",
    },
    {
      id: 5,
      ref:null,
      src:"",
    },
    {
      id: 6,
      ref:null,
      src:"",
    },
    
  ]);
  
  const handleChange = (event) => {
    event.preventDefault();
    let _Images = Images.slice();
    let i;
    for(i = 0; i<_Images.length; ++i){
      if(_Images[i].id==event.target.name){
        _Images[i].ref = event.target.files[0];
        _Images[i].src = URL.createObjectURL(event.target.files[0]);
        break;
      }
    }
    setImages(_Images);
    console.log(Images);

  }

  const handleUpload = (event) => {
    event.preventDefault();
    
    let i;
    let _Images = Images.slice();
    for(i = 0; i<Images.length; i++){
      if(_Images[i].ref!=null){
        var pathRef = storage.ref(`images/1/${_Images[i].ref.name}`)
        const url = async(_Images, i, pathRef) => {
          
          await pathRef.put(_Images[i].ref).then((snapshot) => {
            console.log(`Uploaded Image${i}`);
          });
          pathRef.getDownloadURL()
          .then((url)=>{
            console.log(url);
            _Images[i].src=url;
          });
          setImages(_Images);
        }
        url(_Images, i, pathRef);
        
      }
    }
    console.log(Images);

  }

  const handleDelete = (event) => {

  }

  return(
    <React.Fragment>
      <Modal
      show={props.show}
      onHide={() => {props.onHide(false)}}
      backdrop="static"
      keyboard={false}
      scrollable = {true}
      size = "lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Hot pics</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Row>
              {Images.map((obj, idx) => {
                return (
                  <Col>
                    <div class="image-upload">
                      <label for={`file-input${obj.id}`}>
                        {obj.ref!=null?  
                          <img src={obj.src}
                          width="180" height="240" />:
                          <img src="https://via.placeholder.com/180x240"
                          width="180" height="240" />
                        }
                      </label>
                      <input
                        id={`file-input${obj.id}`}
                        type="file"
                        name={obj.id}
                        onChange={handleChange}
                      />
                      
                      {obj.name!=null &&
                        <Button
                          id={`file-delete${obj.id}`}
                          type="button"
                          name={obj.id}
                          onClick={handleDelete}
                        >
                          D
                        </Button>
                      }

                    </div>

                  </Col>
                )
              })}
            </Row>
          </Container>

          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => {props.onHide(false)}}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>Upload</Button>
        </Modal.Footer>

      </Modal>

    </React.Fragment>
  )
}

export default ImageModal;