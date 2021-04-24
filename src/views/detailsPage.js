import "../styles/detailsPage.style.css"
import {Navbar} from "react-bootstrap"
import Passions from "../components/Passions"
import { useState } from "react";

const DetailsPage = () => {
  
  const [passionModalShow,setPassionModalShow] = useState(false)

  function toggelModalShow(show){
    setPassionModalShow(show);
  }

  return(
    <div className="container">
      <Navbar>
      <Navbar.Brand>
        <span className="page-title">Harmony</span>
      </Navbar.Brand>
    </Navbar>
    <Passions 
      modalShow={passionModalShow} 
      toggelModalShow={toggelModalShow} 
    />
    </div>
  )

}

export default DetailsPage;