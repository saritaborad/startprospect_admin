// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD8Ds3D9eQWluW8A0CggdwjmfVPQHObit4",
  authDomain: "starprosp.firebaseapp.com",
  databaseURL: "https://starprosp-default-rtdb.firebaseio.com",
  projectId: "starprosp",
  storageBucket: "starprosp.appspot.com",
  messagingSenderId: "166489320486",
  appId: "1:166489320486:web:9fd0e4ec5a43b8aad68ae7",
  measurementId: "G-FVLSVMMJ8J"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);