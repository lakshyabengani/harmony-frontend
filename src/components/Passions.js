import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Badge , Button} from "react-bootstrap";
import PassionModal from "./PassionModal";
import "../styles/passion.style.css"



const Passions = (props) => {
  
  const [passionsList,setPassionsList] = useState([]);

  const addPassion = (new_passion) => {
    setPassionsList([...passionsList,new_passion]);
  }

  const removePassion = (deleted_passion) => {
    setPassionsList(passionsList.filter(passion => passion !== deleted_passion));
  }

  const renderPassionList = () => {
    const list = passionsList.map( (passions,idx) => 
    <span key={idx} style={{fontSize: '1.2rem', padding:'5px'}}>
      <Badge className="passionBadge" pill >
        <span className="m-1">{passions}</span>
        <FontAwesomeIcon icon={faTimesCircle} onClick={ () => removePassion(passions)}/>
      </Badge> 
      </span>
    ) 
    return list;
  }

  return(
    <div>
    {renderPassionList()}
    <span style={{fontSize: '1.2rem', padding:'5px'}}>
      <Badge as={Button} className="addpassionBadge" pill onClick={() => props.toggelModalShow(true)}>
        <span className = "m-1">add</span>
        <FontAwesomeIcon icon={faPlusCircle} />
      </Badge> 
      </span>
    <PassionModal 
      show={props.modalShow} 
      onHide={props.toggelModalShow} 
      selectedList={passionsList} 
      addToList={addPassion} 
      removeFromList={removePassion}
    />
    </div>
  )

} 

export default Passions;