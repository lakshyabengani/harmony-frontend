import { Badge, Button, Card, Carousel, Image } from "react-bootstrap";
import '../styles/cards.style.css'

const Cards = (props) => {

  // console.log(props.profile)

  return(
    <>
    { props.profile !== null ?
      <Card className='card'>    
        <Card.Body>
          <Carousel nextIcon="" prevIcon="">
            {
              props.profile.images.map( (imgEle,index) => 
                imgEle.img_src !== "" ?
                <Carousel.Item key={index}>
                  <Image src={imgEle.img_src} alt="" className='card-image' rounded />
                </Carousel.Item> : null )
            }
          </Carousel>
          <br/>
          <div className="container card-text" >
            <Card.Title>
              {props.profile.name}, {props.profile.age}
              <br />
              {props.profile.job}
            </Card.Title>
            <Card.Text>
              {props.profile.passions.map( (passion,idx) =>
                <span key={idx} style={{fontSize: '1.2rem', padding:'5px'}}>
                <Badge className="passionBadge" pill >
                  <span className="m-1">{passion}</span>
                </Badge> 
                </span>
              )}
              <br/>
              {props.profile.bio}
              <br/>
              <br/>
            </Card.Text>
          </div>
          {props.isMatch === true ?  
          <Button variant='primary' block onClick={() => console.log('Chat Feature will be avialable Soon')} >
            CHAT
          </Button> : null}
        </Card.Body>
      </Card> : null }
    </>
  )
}

export default Cards;