import { useEffect, useState } from "react";
import { Button , Col, Container, Row} from "react-bootstrap";
import CarouselCards from "./CarouselCards";
import '../styles/swipeDeck.style.css'
import { getNotifications, getProfileAPi, getProfileSuggestion } from "../api/backend";
import { useInterval } from "../utils/Pollings";
import { peoplesList } from "../config";

const SwipeDeck = props => {

  const [cardIndex,setCardIndex] = useState(0);
  const [showDeck,setShowDeck] = useState(true);
  const [list,setList] = useState([]);
  const [batch,setBatch] = useState({
    index: 0,
    offset:10,
  });

  const changeCardIndex = index => {
    setCardIndex(index);
  }

  const handleShow = show => {
    setShowDeck(show);
  }

  const handleYay = () => {
    setCardIndex(cardIndex+1);
  }

  const handleNay = () => {
    setCardIndex(cardIndex+1);
  }

  const handleList = () =>{
    /**
     * Steps To do : 
     * If we already had a batch to show then we post The userLikes array to backend
     * We fetch the new Batch from backend
     * if the batch has any element we set showDeck to true else false
     */
    setShowDeck(false);
  }
  
  //Notifications  
  // useInterval(async() =>{
  //   try{
  //     const res = await getNotifications(new Date().toString());
  //     console.log(res)
  //   }catch(err){
  //     console.log(err);
  //   }
  // },5*1000)

  useEffect(()=>{
  //   getProfileAPi(localStorage.getItem('public_user_id'))
  //     .then(res => {
  //       console.log(res);
  //   })
  //   .catch(errObj => {
  //     console.log(errObj)
  //   })
    // getProfileSuggestion(batch.index,batch.offset)
    //   .then(res => {
    //     console.log(res);
    // })
    // .catch(errObj => {
    //   console.log(errObj)
    // })
    setList(peoplesList);
    setShowDeck(true);
  },[])

  // useEffect(()=>{
  //   console.log(list);
  //   if(list.length !== 0){
  //     setShowDeck(true);
  //   }
  //   else{
  //     /**
  //      * Steps To do : 
  //      * If we already had a batch to show then we post The userLikes array to backend
  //      * We fetch the new Batch from backend
  //      * if the batch has any element we set showDeck to true else false
  //      */
  //     // setList(peoplesList);
  //     setShowDeck(false);
  //   }
  // },[list])

  return(
    <>
    {showDeck ?
    <Container >   
      <Row className='cards'>
      <CarouselCards 
        index={cardIndex}
        changeCard={changeCardIndex}
        setShow={handleShow}
        suggestionlist={list}
        setlist={setList}
        handleList={handleList}
      />
      </Row>
      <br />
      <Row className='footer'>
        <Col xs lg='2'>
          <Button variant='success' block onClick={() => handleYay()}>Yay</Button>
        </Col>
        <Col xs lg='2'>
          <Button variant='danger' block onClick={() => handleNay()}>Nay</Button>
        </Col>
      </Row>
    </Container>
    :
      <div className='container' style={{textAlign:'center', padding:'20px'}}>
        <h1>
          No More
          <br/>
          Peoples to Display !!!
        </h1>
      </div>
    }
  </>
  )
}

export default SwipeDeck;
