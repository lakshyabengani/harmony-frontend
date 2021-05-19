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
        
        let returnObject = null;

    // The try block will execute properly only for status = 200 and for all other status codes like (400,401,500) catch block will work
        const token = res.data.token;
        const public_uid = res.data.public_user_id;
        localStorage.setItem('JWTtoken',token);
        localStorage.setItem('public_user_id',public_uid);
        returnObject = generateResponse(res.status,res.data,null)

        return returnObject;
    
    }catch(err){
       
        console.log(err.response);
        const res = err.response;
        const errorObject = generateResponse(res.status,null,res.data.error);
        throw errorObject;

    }
}

// Issue : returns 500 on login till now 
export const loginApi = async(user_email,user_password) => {
    try{

        const res = await axios.get(baseUrl+'/login',{
            auth:{
                username: user_email,
                password: user_password
            }
        });

        let returnObject = null;

        const token = res.data.token;
        const public_uid = res.data.public_user_id;
        localStorage.setItem('JWTtoken',token);
        localStorage.setItem('public_user_id',public_uid);
        returnObject = generateResponse(res.status,res.data,null)

        return returnObject;

    }catch(err){

        console.log(err.response);
        const res = err.response;
        const errorObject = generateResponse(res.status,null,res.data.error);
        throw errorObject;
    }
}

// to Do : postSettingsApi 
export const postSettingsApi = async( settings_form ) => {
    try{
        
        const token = localStorage.getItem('JWTtoken');
        const data = JSON.stringify(settings_form);
        const config = {
            method: 'post',
            url: baseUrl+'/settings',
            headers: { 
                'x-access-tokens': token,
                'Content-Type': 'application/json'
            },
            data : data
        }

        const res = await axios(config);

        console.log(res);
        
        const returnObject = generateResponse(res.status,res.data,null)
        return returnObject;

    }catch(err){

        console.log(err.response);
        const res = err.response;
        const errorObject = generateResponse(res.status,null,res.data.error);
        throw errorObject;
    }
}

export const getSettingsApi = async() => {
    try{
        
        const token = localStorage.getItem('JWTtoken');
        const config = {
            method: 'get',
            url: baseUrl+'/settings',
            headers: { 
                'x-access-tokens': token,
            },
        }

        const res = await axios(config);

        console.log(res);
        const returnObject = generateResponse(res.status,res.data,null)
        return returnObject;

    }catch(err){

        console.log(err.response);
        const res = err.response;
        const errorObject = generateResponse(res.status,null,res.data.error);
        throw errorObject;
    }
}