import {Card,} from 'react-bootstrap';
import {Carousel , Row} from 'react-bootstrap';
import { peoplesList } from "../config";
import '../styles/cards.style.css'

function CarouselCards() {

     
     const renderCardList = () => 
     {
          const list = peoplesList.map( (person,idx) => (
               
               <Card style={{ width: '100%' }} key={idx}>
                      
                    <Card.Body>
                    <Carousel>
                         <Carousel.Item>
                              <Row>
                              <img src={person.url} alt=""  height='420px'/>
                              <img src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVvdf3mtAr8BQaBqwu2wAFbJD1dH6jtmyAK7hZRRnbFc0yc_pT' alt=""  height='420px'/>
                              </Row>
                         </Carousel.Item>
                         <Carousel.Item>
                              <img src={person.url} alt=""  height='420px'/>
                         </Carousel.Item>
                    </Carousel>
                    <div style={{ overflowY:'scroll' , height :'150px'}}>
                         <Card.Title>{person.name}, {person.age}</Card.Title>
                              <Card.Text>
                                   {person.info}
                              </Card.Text>
                    </div>
                    </Card.Body>
               </Card>
          )) 
          return list[3];
     }

     return (
          <>
               {renderCardList()}
          </>
     )
}

export default CarouselCards