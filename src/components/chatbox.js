import {useState, useRef, useEffect} from "react";
import { Row, Col, ListGroup, Button, Container } from "react-bootstrap";
import { firestore } from "../firebase";
import firebase from "firebase/app"
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getMatches } from "../api/backend";
import "../styles/chatbox.css"

const Chats = props => {
    
  const [CurrId, setCurrId] = useState('0');
  console.log(CurrId)
  
  
  const [Matches,setMatches] = useState([]);
  

useEffect(()=>{
    getMatches()
    .then((res) => {
      console.log(res);
      let matchList = res.data.matches;
      setMatches(matchList);
    })
    .catch(err =>{
      console.log(err);
    })
  },[])

  const showChat = (event) => {
    event.preventDefault();
    console.log(event.target.name);
    setCurrId(event.target.name);
  }

  return (
    <div className="Appbar">
      <Row>
        <Col xs={3}>
          <container className="m-2">
            <aside>
              <ul>
                {Matches.map((obj, idx) => (
                  <li>
                    <img className="mt-3 p-1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
                    <div>
                      <Button bsPrefix="custom-name" id={obj.matchid} name={obj.matchid} onClick={showChat}>{obj.name}</Button>
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
              <ChatRoom id={CurrId} />
            }

          </section>

        </Col>
      </Row>
    
    
        
    </div>
  );
}

function ChatRoom(props) {
  const dummy = useRef();
  const messagesRef = firestore.collection(props.id);
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  console.log(messages)
  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    //const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      message: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uuid: "9899"
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map((msg) => 
          <ChatMessage key={msg.id} message={msg} /> 
        
      )}
      

      <span ref={dummy}></span>

    </main>
    <footer>
      <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

        <button type="submit" disabled={!formValue}>🕊️s</button>

      </form>
		</footer>
    
  </>)
}

function ChatMessage(props) {
  const { message } = props.message;

  const messageClass = props.uuid === localStorage.getItem("public_user_id") ? 'received' : 'sent';

  return (
    <div>
      <div className={`message ${messageClass}`}>
        <img src={'https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg'} />
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Chats;