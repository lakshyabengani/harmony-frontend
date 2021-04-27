/* eslint-disable no-unused-vars */
import axios from "axios";
import { baseUrl } from "../config";

const generateResponse = (statusCode , data , error ) => {
    
    return {
        status : statusCode,
        data : data,
        error : error
    };

}

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
        
        console.log(res.data);

        let returnObject = null;

        if(res.status === 200){
            const token = res.data.token;
            localStorage.setItem('JWTtoken',token);
            returnObject = generateResponse(res.status,res.data,null)
        }
        else{
            returnObject = generateResponse(res.status,null,res.data.msg);
        }

        return returnObject;
    
    }catch(err){
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
        
        let returnObject = null;

        if(res.status === 200){
            const token = res.data.token;
            localStorage.setItem('JWTtoken',token);
            returnObject = generateResponse(res.status,res.data,null)
        }
        else{
            returnObject = generateResponse(res.status,null,res.data.msg);
        }

        return returnObject;

    }catch(err){

        throw err;
    }
}

export const postSettingsApi = async( settings_form ) => {
    try{
        
        const token = localStorage.getItem('JWTtoken');
        console.log(token+"---------------------");
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

        let returnObject = null;

        if(res.status === 200){
            returnObject = generateResponse(res.status,res.data,null)
        }
        else{
            returnObject = generateResponse(res.status,null,res.data.message);
        }

        return returnObject;

    }catch(err){

        throw err;
    }
}