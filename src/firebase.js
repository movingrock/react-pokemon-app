// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJOMlJV848xc6fL1ytVMJsfIMu7PMOzoU",
  authDomain: "react-poke-app-2ba8f.firebaseapp.com",
  projectId: "react-poke-app-2ba8f",
  storageBucket: "react-poke-app-2ba8f.appspot.com",
  messagingSenderId: "389407376641",
  appId: "1:389407376641:web:bb629bd0836dacf0728700",
  measurementId: "G-LT297XWZ88",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app