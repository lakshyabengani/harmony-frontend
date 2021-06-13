import { useEffect, useState } from "react";
import { Button , Col, Container, Row} from "react-bootstrap";
import CarouselCards from "./CarouselCards";
import '../styles/swipeDeck.style.css'
import { getProfileSuggestion, post_likes } from "../api/backend";
import { peoplesList } from "../config";

const SwipeDeck = props => {

  const [cardIndex,setCardIndex] = useState(0);
  const [showDeck,setShowDeck] = useState(false);
  const [list,setList] = useState([]);
  const [likes,setLikes] = useState([]);
  const [batch,setBatch] = useState({
    index: 1,
    offset:10,
    likes:[],
    list:[],
    cardIndex:0,
  });

  const changeCardIndex = index => {
    // setCardIndex(index);
    setBatch({...batch,cardIndex: index});
  }

  const handleShow = show => {
    setShowDeck(show);
  }

  const handleYay = () => {
    let n_like = batch.likes;
    n_like.push(batch.list[batch.cardIndex].public_id);
    // console.log(n_like);
    // setLikes(n_like);
    // setCardIndex(cardIndex+1);
    setBatch({...batch,likes:n_like,cardIndex:batch.cardIndex+1});
  }

  const handleNay = () => {
    // setCardIndex(cardIndex+1);
    setBatch({...batch,cardIndex:batch.cardIndex+1});
  }

  const handleList = () =>{
    /**
     * Steps To do : 
     * If we already had a batch to show then we post The userLikes array to backend
     * increment the batch index
     * We fetch the new Batch from backend
     * if the batch has any element we set showDeck to true else false
     */
    setShowDeck(false);
  }
  
  useEffect(()=>{
    // console.log(batch.index);
    getProfileSuggestion(batch.index,batch.offset)
      .then(res => {
        // console.log(res);
        // setList(res.data.recommendation);
        setBatch({...batch,list:res.data.recommendation});
        if(res.data.recommendation.length > 0 ){
          setShowDeck(true);
        }else{
          setShowDeck(false);
        }
    })
    .catch(errObj => {
      console.log(errObj)
    });
  },[])

  useEffect(()=>{
    if(showDeck === false && batch.list.length > 0){
      // console.log("not showing");
      // console.log(batch.likes);
      post_likes(batch.likes)
      .then(res => console.log(res))
      .catch(err => console.log(err));
      getProfileSuggestion(batch.index+1,batch.offset)
      .then(res => {
        // console.log(res);
        setBatch({...batch,list:res.data.recommendation,likes:[],cardIndex:0,index: batch.index+1});
        if(res.data.recommendation && res.data.recommendation.length > 0 ){
          setShowDeck(true);
        }else{
          setShowDeck(false);
        }
    })
    .catch(errObj => {
      // console.log(errObj)
    });
    }
    else{
      // console.log("showing");
    }
  },[showDeck])

  return(
    <>
    {showDeck ?
    <Container >   
      <Row className='cards'>
      <CarouselCards 
        index={batch.cardIndex}
        changeCard={changeCardIndex}
        setShow={handleShow}
        suggestionlist={batch.list}
        // setlist={setList}
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
