import React from "react";
import ImageModal from "./ImageModal";
import { Button } from "react-bootstrap";

const Images = (props) => {
  return(
    <div>
      <Button onClick = {
        () => props.toggleModalShow(true)
      }> 
        Add some pics
      </Button>
      < ImageModal
      show = {
        props.modalShow
      }
      onHide = {
        props.toggleModalShow
      }
      />
    </div>
  )
}

export default Images;