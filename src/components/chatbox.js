import {useState, useRef, useEffect} from "react";
import { Row, Col, ListGroup, Button, Container } from "react-bootstrap";
import { firestore } from "../firebase";
import firebase from "firebase/app"
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getMatches } from "../api/backend";
import "../styles/chatbox.css"

const Chats = props => {
    
  const [CurrId, setCurrId] = useState(0);
  const [currImg, setCurrImg] = useState("");
  // console.log(CurrId)
  
  
  const [Matches,setMatches] = useState([]);
  

  useEffect(()=>{
    getMatches()
    .then((res) => {
      // console.log(res);
      let matchList = res.data.matches;
      setMatches(matchList);
    })
    .catch(err =>{
      // console.log(err);
    })
  },[])

  const showChat = (event) => {
    event.preventDefault();
    // console.log(event.target.id);
    setCurrId(event.target.id);
    setCurrImg(event.target.name);
  }

  return (
    <div className="Appbar">
      <Row>
        <Col xs={3}>
          <container className="m-2">
            <aside>
              <ul className="li">
                {Matches.map((obj, idx) => (

                  <li className="li">
                    <img className="mt-2 ml-4 p-1 profimg" src={obj.img_src} alt="" />

                    <div>
                      <Button style={{
                        backgroundColor: "#282c34", /* Green */
                        color: "white",
                        padding: "15px 32px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        borderColor: "#45A293",
                        border: "3px solid-transparent",
                        color: "#45A293",
                        borderRadius: "50px",
                      }}  bsPrefix="custom-name" id={obj.match_id} name={obj.img_src} onClick={showChat}>{obj.name}</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </container>
        </Col>
        <Col>

          <section>

            {CurrId &&
              <ChatRoom id={CurrId} currImg={currImg}/>
            }

          </section>

        </Col>
      </Row>   
        
    </div>
  );
}

function ChatRoom(props) {
  const dummy = useRef();
  const messagesRef = firestore.collection(props.id.toString());
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  // console.log(messages)
  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    //const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      message: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uuid: localStorage.getItem("public_user_id"),
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map((msg) => 
          <ChatMessage key={msg.id} message={msg} currImg={props.currImg}/> 
        
      )}
      

      <span ref={dummy}></span>

    </main>
    <footer>
      <form className ="sendmsg" onSubmit={sendMessage}>

        <input className="chatinput" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

        <button className="chatbtn button" type="submit" disabled={!formValue} >🕊️send</button>

      </form>
		</footer>
    
  </>)
}

function ChatMessage(props) {
  const { message,uuid } = props.message;

  const messageClass = uuid === localStorage.getItem("public_user_id") ? 'sent' : 'received';
  const ownpic =
    localStorage.getItem("img_src") ??
    "https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg";
  const img_src = uuid === localStorage.getItem("public_user_id") ? ownpic: props.currImg;

  return (
    <div>
      <div className={`message ${messageClass}`}>
        <img className="chatimg" src={img_src} alt=""/>
        <p className="p">{message}</p>
      </div>
    </div>
  )
}

export default Chats;
