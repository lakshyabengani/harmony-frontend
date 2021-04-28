import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "../styles/TinderCards.css"

function TinderCards() {

     const [people, setPeople] = useState([

          {
               name: 'steve jobs',
               age: 60,
               url: 'https://cdn.britannica.com/s:250x250,c:crop/04/171104-050-AEFE3141/Steve-Jobs-iPhone-2010.jpg',
               info: 'Steve Jobs became CEO of Apple in 1997, following his companys acquisition of NeXT. He was largely responsible for helping revive Apple, which had been on the verge of bankruptcy. ',
          },
          {
               name: 'Mark zuckerberg',
               age: 38,
               url: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTQyMDA0NDgwMzUzNzcyNjA2/mark-zuckerberg_gettyimages-512304736jpg.jpg',
               info: 'The New Yorker noted that by the time Zuckerberg began classes at Harvard in 2002, he had already achieved a "reputation as a programming prodigy.',
          },
          {
               name: 'Elon Musk',
               age: 40,
               url: 'https://cdn.britannica.com/s:690x388,c:crop/54/188754-050-A3613741/Elon-Musk-2010.jpg',
               info: 'In 2001, Musk became involved with the nonprofit Mars Society. He was inspired by plans to place a growth-chamber for plants on Mars and discussed funding the project himself.',
          },
          {
               name: 'Jeff Bezos',
               age: 57,
               url: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTY2NzA3ODE3OTgwMzcyMjYw/jeff-bezos-andrew-harrer_bloomberg-via-getty-images.jpg',
               info: 'In late 1993, Bezos decided to establish an online bookstore.[44] He left his job at D. E. Shaw and founded Amazon in his garage on July 5, 1994.',
          },
     ]);
     
     // BAD
     // const people = [];
     // people.push('sonny', 'quazi')

     // GOOD (Push in an aray in REACT)
     // setPeople([...people, 'sonny', 'qazi'])


     // Piece of code which runs based on a condition
     // useEffect(() => {

     //      database.collection('people').onSnapshot(snapshot => (
     //           setPeople(snapshot.docs.map(doc => doc.data()))
     //      ))


     // }, []);

     return (
          <div>

               <div className = "tinderCards__cardContainer">

                    {people.map((person) => (
                         <TinderCard className = "swipe" key = {person.name} preventSwipe = {["up", "down"]}>
                              <div 
                                   style = {{ backgroundImage: `url(${person.url})`}}
                                   className = "card"
                              >
                              </div>

                              <div className = "card_info" style={{backgroundColor: '#ffffff'}}>
                                   <h3>{person.name}, {person.age}</h3>
                                   <div>
                                        <h6>{person.info}</h6>
                                   </div>
                              </div>
                         </TinderCard>
                    ))}
               </div>

          </div>
     )
}

export default TinderCards
