import { useState } from "react";
import { Button , Col, Container, Row} from "react-bootstrap";
import CarouselCards from "./CarouselCards";
import '../styles/swipeDeck.style.css'

const SwipeDeck = props => {

  const [cardIndex,setCardIndex] = useState(0);
  const [showDeck,setShowDeck] = useState(true);

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

  return(
    <>
    {showDeck &&
    <Container >   
      <Row className='cards'>
      <CarouselCards 
        index={cardIndex}
        changeCard={changeCardIndex}
        setShow={handleShow}
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
    }
    {
      !showDeck && 
      <div className='container' style={{textAlign:'center', padding:'20px'}}>
        <h1>
          No More
          <br/>
          Matches to Display !!!
        </h1>
      </div>
    }
  </>
  )
}

export default SwipeDeck;