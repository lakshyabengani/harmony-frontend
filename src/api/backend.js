/* eslint-disable no-unused-vars */
import axios from "axios";
import { baseUrl } from "../config";

export const signupApi = async(user_email,user_password) => {
    try{
        const name = "Dummy";

        const data = JSON.stringify({
            f_name : name,
            email: user_email,
            password: user_password,
        });

        const config = {
            method: 'post',
            url: baseUrl+'/signup',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        }

        const res = await axios(config);
        
        console.log(res);
        
        return res;
    
    }catch(err){
       
        console.log(err);
       
        throw err;
    }
}

export const loginApi = async(user_email,user_password) => {
    try{

        const res = await axios.get(baseUrl+'/login',{
            auth:{
                username: user_email,
                password: user_password
            }
        });
        
        console.log(res);
        
        const token = 'token'
        localStorage.setItem('JWTtoken',token);
        
        return res;

    }catch(err){
       
        console.log(err);
        throw err;
    }
}

export const postSettingsApi = async( settings_form ) => {
    try{
        
        const token = localStorage.getItem('JWTtoken');
        const data = JSON.stringify(settings_form);
        const config = {
            method: 'post',
            url: baseUrl+'/settings',
            headers: { 
                'x-access-tokens': token,
            },
            data : data
        }

        const res = await axios(config);

        console.log(res);
        return res;

    }catch(err){

        console.log(err);
        throw err;
    }
}