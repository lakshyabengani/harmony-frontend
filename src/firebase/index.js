import firebase from "firebase/app"
import "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "harmony-d2b46.firebaseapp.com",
    projectId: "harmony-d2b46",
    storageBucket: "harmony-d2b46.appspot.com",
    messagingSenderId: "1090198769943",
    appId: "1:1090198769943:web:7a65dd32accffd53222752",
    measurementId: "G-79MW7DYDS7"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};