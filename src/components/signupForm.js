/* eslint-disable no-unused-vars */
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faUser, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faBriefcase, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Form, InputGroup, ToggleButton } from "react-bootstrap";
import { sexual_orientations, SPOTIFY_AUTH_URL} from "../config";
import DatePicker from 'react-date-picker';
import Passions from '../components/Passions'
import { getSettingsApi, postSettingsApi } from "../api/backend";
import Images from "./Images";

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID ;
const SPOTIFY_REDIRECT_URL = process.env.REACT_APP_SPOTIFY_REDIRECT_URL;

const SignupForm = props => {

  const [passionModalShow, setPassionModalShow] = useState(false);

  const [imagesModalShow, setImagesModalShow] = useState(false);

  function toggleImagesModalShow(show){
    setImagesModalShow(show);
  }

  function toggelModalShow(show) {
    setPassionModalShow(show);
  }

  const [signupForm,setSignupForm] = useState({
    name: '',
    gender: '',
    bio: '',
    age_min: 18,
    age_max: 21,
    job: '',
    education: '',
    interested_gender: 'Men',
    sexual_orientation_name: '',
    ytmusic_link: "",
    spotify_link: '',
    user_passions: [],
  });

  const addPassion = (new_passion_id) => {
    const n_list = signupForm.user_passions;
    n_list.push(new_passion_id);
    setSignupForm({...signupForm,user_passions : n_list});
  }

  const removePassion = (deleted_passion_id) => {
    const new_list = signupForm.user_passions.filter(passion_id  => passion_id !== deleted_passion_id)
    setSignupForm({...signupForm,user_passions : new_list});
  }


  const [fixedLists,setFixedLists] = useState({
    sexual_orientation_list: [] ,
    passion_list: [] ,
  })

  const [birth_date, onChange] = useState(new Date());

  const handleChange = (event) => {
    event.preventDefault();
    setSignupForm({...signupForm,[event.target.name] : event.target.value });
  }

  const validateForm = () => {
    if(signupForm.name === "" || signupForm.gender === "" || signupForm.birthday === "" ){
      alert('Fill in the mandatory details');
      return false;
    }
    else if(signupForm.age_min >= signupForm.age_max){
      alert('max age should be greater than min age ');
      setSignupForm({ ...signupForm, age_max: 21 , age_min : 18 });
      return false;
    }
    else if(!signupForm.spotify_link){
      alert('sign into Spotify');
    }
    else return true;
  }

  const handleSubmit = (event) => {
    if(validateForm()){

      const desired_list = fixedLists.sexual_orientation_list.filter( orientation => orientation.name === signupForm.sexual_orientation_name);
      const orientation_id = desired_list[0].id;
      const temp = Object.assign({},signupForm);
      const data = Object.assign(temp,{
        birth_date : new Date(birth_date),
        sexual_orientation_id : orientation_id,
        passions : signupForm.user_passions,
      });
      data['age_max'] = parseInt(data['age_max']);
      data['age_min'] = parseInt(data['age_min']);
      delete data['user_passions'];
      delete data['sexual_orientation_name'];
      delete data['ytmusic_link'];
      console.log(data);
      
      postSettingsApi(data)
        .then(res => {
          console.log(res);
          alert('Form Submitted');
          sessionStorage.clear();
          props.submitAction(true);
        })
        .catch(err => {
          console.log(err);
          alert('error in form submission');
        });
    }
    
  }

  const handleSpotify = () => {
    const data = Object.assign(signupForm,{
      birth_date : new Date(birth_date),
    });
    Object.keys(data).forEach( (key) => {
      if(key === 'birth_date')
        sessionStorage.setItem('birth_date',birth_date.toString());
      else if(key === 'user_passions') 
        sessionStorage.setItem(key,JSON.stringify(data[key]));
      else 
        sessionStorage.setItem(key,data[key])
    });
    window.location = `${SPOTIFY_AUTH_URL}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URL}&scope=user-top-read&response_type=token&show_dialog=true`;
  }

  //To Do : Set the initial Values of the state after a GET call on the setting API

  const setFormData = (inputData) =>{

    setSignupForm({
      name : sessionStorage.getItem('name') ?? (inputData.name ?? ""),
      age_max : sessionStorage.getItem('age_max') ? parseInt(sessionStorage.getItem('age_max')) : (inputData.age_max ?? 21 ),
      age_min : sessionStorage.getItem('age_min') ? parseInt(sessionStorage.getItem('age_min')) : ( inputData.age_min ?? 18 ),
      gender : sessionStorage.getItem('gender') ?? (inputData.gender ?? "")  ,
      bio : sessionStorage.getItem('bio') ?? ( inputData.bio ?? ""),
      interested_gender : sessionStorage.getItem('interested_gender') ?? ( inputData.interested_gender ?? 'Men' ),
      job : sessionStorage.getItem('job') ?? ( inputData.job ?? "" ),
      spotify_link : sessionStorage.getItem('spotify_link') ?? (inputData.spotify_link ?? ""),
      ytmusic_link : sessionStorage.getItem('ytmusic_link') ?? ( inputData.ytmusic_link ?? ""),
      sexual_orientation_name : sessionStorage.getItem('sexual_orientation_name') ?? (inputData.sexual_orientation_name ?? inputData.sexual_orientation_list[0].name ),
      education : sessionStorage.getItem('education') ?? ( inputData.education ?? ''),
      user_passions : sessionStorage.getItem('user_passions') ?  JSON.parse(sessionStorage.getItem('user_passions')) : inputData.user_passions.map( passions => passions.passion_id) ,
    });

    onChange(sessionStorage.getItem('birth_date') ? new Date(sessionStorage.getItem('birth_date')) : (inputData.birth_date ? new Date(inputData.birth_date) : new Date()));

    setFixedLists({
      sexual_orientation_list : inputData.sexual_orientation_list,
      passion_list : inputData.passion_list,
    });

  }

  useEffect(() => {
    try{
  
      // check if the spotify access code is present or not 
      const params = window.location.search;
      if(params){
        const st = params.slice(1).split('&');
        const a = st[0].split('=');
        const title = a[0];
        const value = a[1];
        if(title === "code")
          sessionStorage.setItem('spotify_link',value);
        else{
          alert('Error');
          console.log('error',value);
        }
      }

      // make an api call to get all the settings of the user and store it in session storage.
      getSettingsApi()
        .then((obj) => {
          console.log(obj);
          setFormData(obj.data.data);
        })
        .catch(err => {
          console.log(err);
        });

    }catch(err){
      console.log(err); 
    }
  },[])

  return (
    <div style={{ padding: "40px 20px" }}>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="firstName">
            <Form.Label>First Name*</Form.Label>
            <InputGroup className="mb-2" hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                name="name"
                placeholder="First Name"
                value={signupForm.name}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="bio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={signupForm.bio}
              onChange={handleChange}
              placeholder="Enter Your Bio Here..."
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="job">
            <Form.Label>Job</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faBriefcase} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                name="job"
                placeholder="Job"
                value={signupForm.job}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} controlId="education">
            <Form.Label>Education</Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faGraduationCap} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                name="education"
                placeholder="Education"
                value={signupForm.education}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Col sm={6}>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <div
                key="inline-radio"
                className="mb-3"
                onChange={handleChange}
                value={signupForm.gender}>
                <Form.Check
                  inline
                  name="gender"
                  type="radio"
                  label="Men"
                  id="men"
                  value="Men"
                  className="mr-2"
                />
                <Form.Check
                  inline
                  name="gender"
                  type="radio"
                  label="Women"
                  value="Women"
                  id="women"
                />
              </div>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="dob">
              <Form.Label>Date of Birth</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCalendar} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <DatePicker onChange={onChange} value={birth_date} calendarIcon="" />
              </InputGroup>
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="ageRange">
            <Form.Label>Age Range</Form.Label>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Form.Text>Min Age</Form.Text>
              <Form.Text>{signupForm.age_min}</Form.Text>
            </div>
            <Form.Control
              type="range"
              min="18"
              max="100"
              step="1"
              value={signupForm.age_min}
              name="age_min"
              onChange={handleChange}
              custom
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Form.Text>Max Age</Form.Text>
              <Form.Text>{signupForm.age_max}</Form.Text>
            </div>
            <Form.Control
              type="range"
              min="18"
              max="100"
              step="1"
              value={signupForm.age_max}
              name="age_max"
              onChange={handleChange}
              custom
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="orientaion">
            <Form.Label>Sexual Orientation</Form.Label>
            <Form.Control
              as="select"
              name="sexual_orientation_name"
              defaultValue={sessionStorage.getItem('sexual_orientation_name') ?? signupForm.sexual_orientation_name}
              onChange={handleChange}
              custom>
              {fixedLists.sexual_orientation_list.map((orientation) => (
                <option key={orientation.id}>{orientation.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="showMe">
            <Form.Label>Show Me</Form.Label>
            <Form.Control
              as="select"
              name="interested_gender"
              defaultValue={sessionStorage.getItem('interested_gender') ?? signupForm.interested_gender}
              onChange={handleChange}
              custom>
              <option>Men</option>
              <option>Women</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Col>
            <Button variant="success" block onClick={() => handleSpotify()}>
              <FontAwesomeIcon icon={faSpotify} size="2x" pull="left" />
              <span style={{ fontSize: "125%" }}>Spotify</span>
            </Button>
          </Col>
          <Col>
            <Button variant="danger" block>
              <FontAwesomeIcon icon={faYoutube} size="2x" pull="left" />
              <span style={{ fontSize: "125%" }}>YT Music</span>
            </Button>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Label className="mt-2">Passions</Form.Label>
            <Passions
              modalShow={passionModalShow}
              toggelModalShow={toggelModalShow}
              addPassion = {addPassion}
              removePassion = {removePassion}
              user_passions = {signupForm.user_passions}
              passion_list = {fixedLists.passion_list}
            />
          </Col>
          
          <Col>
            <Form.Label className="mt-2">Add Images</Form.Label>
            <Images
              modalShow={imagesModalShow}
              toggleModalShow={toggleImagesModalShow}
            />
          </Col>
        </Form.Row>
        
        <Form.Row>
          <Form.Group
            as={Col}
            controlId="sumbit"
            style={{ padding: "40px 20px" }}>
            <Button variant="primary" block onClick={handleSubmit}>
              {" "}
              CONTINUE{" "}
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
}

export default SignupForm;

