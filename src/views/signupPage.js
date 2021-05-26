import { Navbar } from "react-bootstrap";
import { Redirect } from "react-router";
import SignupForm from "../components/signupForm";
import "../styles/signupPage.style.css";
import {useState} from 'react'

const SignupPage = () => {

  const [sumbitted,setSubmitted] = useState(false)

  const handlePageSumbit = (submit) =>{
    setSubmitted(submit)
  }

  return(
    <div className="container">
    <Navbar>
      <Navbar.Brand>
        <span className="page-title">Harmony</span>
      </Navbar.Brand>
    </Navbar>
    <div className="page-header">Settings</div>
    <SignupForm submitAction={handlePageSumbit} /> 
    { sumbitted && 
      <Redirect to='/home' />
    }
    </div>
  )
}


export default SignupPage;