// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA35tDTwqfgVjq5B9ImzQT9s9i1v15ZkvE",
  authDomain: "rekebishaapp.firebaseapp.com",
  databaseURL: "https://rekebishaapp-default-rtdb.firebaseio.com",
  projectId: "rekebishaapp",
  storageBucket: "rekebishaapp.appspot.com",
  messagingSenderId: "869728077538",
  appId: "1:869728077538:web:be42ce795dbcec341740bb",
  measurementId: "G-Q9V25PRBFF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();
export const storage = firebase.storage();
export const storageRef = storage.ref();
export const auth = firebase.auth();