import { Navbar } from "react-bootstrap";
import SignupForm from "../components/signupForm";
import "../styles/signupPage.style.css";

const SignupPage = () => {

  return(
    <div class="container">
    <Navbar>
      <Navbar.Brand>
        <span className="page-title">Harmony</span>
      </Navbar.Brand>
    </Navbar>
    <div className="page-header">Sign Up</div>
    <SignupForm /> 
    </div>
  )
}


export default SignupPage;