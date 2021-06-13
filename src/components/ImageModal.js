/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react";
import { Modal, Row, Col, Button, Container } from "react-bootstrap";
import { storage } from "../firebase";
import {getProfileImagesApi, postImagesApi} from "../api/backend";
import "../styles/ImageModal.style.css"

const ImageModal = (props) => {

  const [Images, setImages] = useState([
    {
      id: 1,
      ref:"",
      file:null,
      src:"",
    },
    {
      id: 2,
      ref:"",
      file: null,
      src:"",
    },
    {
      id: 3,
      ref:"",
      file: null,
      src:"",
    },
    {
      id: 4,
      ref:"",
      file: null,
      src:"",
    },
    {
      id: 5,
      ref:"",
      file: null,
      src:"",
    },
    {
      id: 6,
      ref:"",
      file: null,
      src:"",
    },
    
  ]);
  
  const setImagesData= (data) => {
    let _Images = Images.slice();
    let i;
    for (i = 0; i < data.length; ++i) { 
      _Images[i].ref = data[i].ref
      _Images[i].src = data[i].src;     
    }
    setImages(_Images);
    // console.log(Images);
  }

  useEffect(() => {
    try{
      getProfileImagesApi()
        .then((obj) => {
          // console.log(obj);
          setImagesData(obj.data.user_images);
        })
        .catch(err => {
          // console.log(err);
        });
    }catch (err) {
      // console.log(err);
    }
  },[])


  const handleChange = (event) => {
    event.preventDefault();
    let _Images = Images.slice();
    let i;
    for(i = 0; i<_Images.length; ++i){
      if(_Images[i].id==event.target.name){
        _Images[i].file = event.target.files[0];
        _Images[i].src = URL.createObjectURL(event.target.files[0]);
        _Images[i].ref = _Images[i].file.name
        break;
      }
    }
    setImages(_Images);
    // console.log(Images);

  }

  const handleUpload = (event) => {
    event.preventDefault();
    
    
    let _Images = Images.slice();
    const uuid = localStorage.getItem("public_user_id")
        
    function uploadImagesToFirebase(_Images, uuid){
      // console.log(_Images)
      const promises = []
      let i
      for (i = 0; i < _Images.length; ++i) {
        if (_Images[i].file != null) {
          const promise = new Promise((resolve, reject) => {
            var pathRef = storage.ref(`images/${uuid}/${_Images[i].ref}`)
            const url = async (_Images, i, pathRef) => {
              // console.log(_Images[i])
              await pathRef.put(_Images[i].file).then((snapshot) => {
                // console.log(`Uploaded Image${i}`);
              });
              pathRef.getDownloadURL()
                .then((url) => {
                  // console.log(url);
                  _Images[i].src = url
                  // console.log(_Images)
                  resolve()
                });
              setImages(_Images);
            }
            url(_Images, i, pathRef);
            
          })
          promises.push(promise);
        }
      }
      Promise.all(promises).then(() => {
        const data = { 'images': Images }
        // console.log(data)
        postImagesApi(data)
          .then(res => {
            // console.log(res);
            //alert('Images Uploaded');
          })
          .catch(err => {
            console.log(err);
          });
      });
      
    }

    uploadImagesToFirebase(_Images, uuid)
    

  }

  const handleDelete = (event) => {
    event.preventDefault();
    let _Images = Images.slice();
    const uuid = localStorage.getItem("public_user_id")
    var storageRef = storage.ref();
    let i;
    for (i = 0; i < _Images.length; ++i) {
      if (_Images[i].id == event.target.name) {
        var desertRef = storageRef.child(`images/${uuid}/${_Images[i].ref}`);
        _Images[i].ref = "";
        _Images[i].src = "";
        // Delete the file
        desertRef.delete().then(() => {
          // console.log("File deleted successfully")
          const data = { 'images': _Images }
          // console.log(data)
          postImagesApi(data)
            .then(res => {
              // console.log(res);
              setImages(_Images);
              //alert('Images Uploaded');
            })
            .catch(err => {
              // console.log(err);
            });
        }).catch((error) => {
          // console.log(error)
        });
        
        break;
      }
    }
    
    // console.log(Images);
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
                        {obj.ref!=""?  
                          <img src={obj.src}
                          width="180" height="240" alt=""/>:
                          <img src="https://via.placeholder.com/180x240"
                          width="180" height="240" alt=""/>
                        }
                      </label>
                      <input
                        id={`file-input${obj.id}`}
                        type="file"
                        name={obj.id}
                        onChange={handleChange}
                      />
                      
                      {obj.ref!="" &&
                        <Button
                          id={`file-delete${obj.id}`}
                          type="button"
                          name={obj.id}
                          onClick={handleDelete}
                        >
                          X
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