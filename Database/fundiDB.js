// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const otherfirebaseConfig = firebase.initializeApp( {
    apiKey: "AIzaSyDnQjdg7HNuO5CQhCKD2DS8R__hr2f4_ys",
    authDomain: "rekebishafundi-94607.firebaseapp.com",
    projectId: "rekebishafundi-94607",
    storageBucket: "rekebishafundi-94607.appspot.com",
    messagingSenderId: "27983586788",
    appId: "1:27983586788:web:2615cfffbdbc199efd93f1"
},'otherfirebaseConfig');


// Initialize Cloud Firestore and get a reference to the service
export const dbc = otherfirebaseConfig.firestore();
export const storagec = otherfirebaseConfig.storage();
export const storageRefc = storagec.ref();
export const authc = otherfirebaseConfig.auth()