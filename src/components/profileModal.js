import React , { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { getProfileAPi } from "../api/backend";
import Cards from "./Cards";

const ProfileModal = (props) => {

  const [user,setUser] = useState({});

  useEffect(()=>{
    // console.log(props.userId)
    // console.log(user)
    getProfileAPi(props.userId)
    .then(res => {
        // console.log(res);
        setUser(res.data.user_data);
    })
    .catch(errObj => {
    // console.log(errObj)
    });
  },[])

  return(
    <React.Fragment>
      <Modal
        show={props.show}
        onHide={() => { props.onHide(false)}}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Cards profile={user} isMatch={false} />
      </Modal>
    </React.Fragment>
  )
}

export default ProfileModal;