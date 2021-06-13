import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import "../styles/sidebar.style.css";
// import { msgList } from "../config";
import { useEffect, useState } from "react";
import { getMatches } from "../api/backend";
import { useInterval } from "../utils/Pollings";

const SideBar = (props) =>{

  const [msgData, setMsgData] = useState([]);
  const [searchText,setSearchText] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const text = event.target.value ;
    setSearchText(text);
  } 

  const renderList = () =>{
    
    const defaultList = msgData.filter( word => word.name.toLowerCase().includes(searchText.toLowerCase()));
    let options = null;
    if(defaultList.length > 0){
      options = defaultList.map((el, idx) =>{
        return(
          <Row
            key={idx}
            style={{
                paddingTop: 10,
                paddingBottom: 10,
            }}
          >
            <Col xs={3}>
              <Image
                src={el.img_src}
                roundedCircle
                height={75}
                width={75}
              />
            </Col>
            <Col xs={9}>
              <Row>{el.name}</Row>
            </Col>
          </Row>
        )}
      )}
      else options = <Col><h2>No Matches Found</h2></Col>
      return options
  }

  useEffect(()=>{
    getMatches()
    .then((res) => {
      // console.log(res);
      let matchList = res.data.matches;
      setMsgData(matchList);
    })
    .catch(err =>{
      // console.log(err);
    })
  },[])

  useInterval(async() =>{
    try{
      const res = await getMatches();
      let matchList = res.data.matches;
      setMsgData(matchList);
    }catch(err){
      // console.log(err);
    }
  },5*1000)

  return(
    <>
      <span className='sidebar-title'>
        <h2>Matches</h2>
      </span>
      <Form.Group controlId="searchBox">
          <InputGroup className="mb-2">
              <InputGroup.Prepend>
                  <InputGroup.Text
                      style={{
                          background: "transparent",
                          border: "none",
                      }}
                  >
                      <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                  type="text"
                  placeholder="Search"
                  style={{ borderRadius: 15 }}
                  onChange={handleChange}
              />
          </InputGroup>
      </Form.Group>
      <div className="msg-tile">
        {renderList()}
      </div>
    </>
  )
}

export default SideBar;