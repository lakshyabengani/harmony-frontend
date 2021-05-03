import React, { useEffect, useState } from "react";
import {Card, CardDeck, CardGroup} from 'react-bootstrap';
import {Carousel} from 'react-bootstrap';
import { peoplesList } from "../config";

function CarouselCards() {

     
     const renderCardList = () => 
     {
          const list = peoplesList.map( (person,idx) => (
               
               <Card style={{ width: '20rem' }} key={idx}>
                      
                    <Card.Body>
                    <Carousel>
                         <Carousel.Item>
                              <img src={person.url}/>
                         </Carousel.Item>
                    </Carousel>
                         <Card.Title>{person.name}, {person.age}</Card.Title>
                              <Card.Text>
                                   {person.info}
                              </Card.Text>
                    </Card.Body>
               </Card>
          )) 
          return list[3];
     }

     return (
          <div>
               {renderCardList()}
          </div>
     )
}

export default CarouselCards