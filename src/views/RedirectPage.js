import { useEffect} from "react";
import { Redirect } from "react-router";

const RedirectPage = () =>{

  useEffect(()=>{
    const a = window.location.hash.slice(1).split('&');
    console.log(a);
    if(a){
      const tk = a[0].split('=');
      console.log(tk[1]);
      localStorage.setItem('spotify_access_token',tk[1]);
    }
  },[])

  return(
    <Redirect to='/settings' />
  )
}

export default RedirectPage;