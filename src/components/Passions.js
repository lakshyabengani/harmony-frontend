import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge , Button} from "react-bootstrap";
import PassionModal from "./PassionModal";
import "../styles/passion.style.css"



const Passions = (props) => {
  
  const renderPassionList = () => {
    const passionsList = props.passion_list.filter(passion => props.user_passions.includes(passion.passion_id));
    const list = passionsList.map( (passions,idx) => 
    <span key={idx} style={{fontSize: '1.2rem', padding:'5px'}}>
      <Badge className="passionBadge" pill >
        <span className="m-1">{passions.passion_name}</span>
        <FontAwesomeIcon icon={faTimesCircle} onClick={ () => props.removePassion(passions.passion_id)}/>
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
      selectedList={props.user_passions} 
      addToList={props.addPassion} 
      removeFromList={props.removePassion}
      passion_list = {props.passion_list}
    />
    </div>
  )

} 

export default Passions;