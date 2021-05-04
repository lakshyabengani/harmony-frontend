import {Card,Carousel, Image } from 'react-bootstrap';
import { peoplesList } from "../config";
import '../styles/cards.style.css'

function CarouselCards(props) {

     const renderCardList = () => 
     {
          const list = peoplesList.map( (person,idx) => (
               
               <Card className='card' key={idx}>    
                    <Card.Body>
                         <Carousel>
                              {
                                   person.url.map( imgUrl => 
                                        <Carousel.Item>
                                             <Image src={imgUrl} alt="" className='card-image' rounded/>
                                        </Carousel.Item>)
                              }
                         </Carousel>
                         <br/>
                         <div className="container card-text" >
                              <Card.Title>{person.name}, {person.age}</Card.Title>
                                   <Card.Text>
                                        {person.info}
                                   </Card.Text>
                         </div>
                    </Card.Body>
               </Card>
          )) 

          if(props.index < list.length)
               return list[props.index];
          else 
               props.setShow(false);
     }

     return (
          <>
               {renderCardList()}
          </>
     )
}

export default CarouselCards