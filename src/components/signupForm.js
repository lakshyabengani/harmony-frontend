/* eslint-disable no-unused-vars */
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faUser, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faBriefcase, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, ButtonGroup, Col, Form, InputGroup, ToggleButton } from "react-bootstrap";
import { sexual_orientations } from "../config";
import DatePicker from 'react-date-picker';
import Passions from '../components/Passions'
import { postSettingsApi } from "../api/backend";
import Images from "./Images";


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
    name: "",
    gender: "",
    bio: "",
    age_min: 18,
    age_max: 21,
    job: "",
    education: "",
    interested_gender: "Men",
    orientaion: "Straight",
    ytmusic_link: "",
    spotify_link: "",
  });

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
    else return true;
  }

  const handleSubmit = (event) => {
    if(validateForm()){

      const temp = Object.assign({},signupForm);
      const data = Object.assign(temp,{
        birth_date : new Date(birth_date),
      });
      
      console.log(data);
      
      // postSettingsApi(data).then(res => console.log(res)).catch(err => console.log(err));

      alert("Form Submitted");
      
      setSignupForm({
        name: "",
        gender: "",
        bio: "",
        birthday: "",
        age_min: 18,
        age_max: 21,
        job: "",
        education: "",
        interested_gender: "Men",
        orientaion: "Straight",
        ytmusic_link: "",
        spotify_link: "",
      });
      props.submitAction(true);
    }
    
  }


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
                  label="Male"
                  id="male"
                  value="male"
                  className="mr-2"
                />
                <Form.Check
                  inline
                  name="gender"
                  type="radio"
                  label="Female"
                  value="female"
                  id="female"
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
              name="orientation"
              defaultValue={signupForm.orientaion}
              onChange={handleChange}
              custom>
              {sexual_orientations.map((orientation, idx) => (
                <option key={idx}>{orientation}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="showMe">
            <Form.Label>Show Me</Form.Label>
            <Form.Control
              as="select"
              name="interested_gender"
              defaultValue={signupForm.interested_gender}

              onChange={handleChange}
              custom>
              <option>Men</option>
              <option>Women</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Col>
            <Button variant="success" block>
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

