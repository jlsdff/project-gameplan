// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/analytics";

// import storage from "firebase/compat/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAA3j1F-HPOE8iVu1P-IHAsoSg9Ff5hbIA", 
  authDomain: "the-project-gameplan.firebaseapp.com",
  projectId: "the-project-gameplan",
  storageBucket: "the-project-gameplan.appspot.com",
  messagingSenderId: "1060600103566",
  appId: "1:1060600103566:web:1322262655eff59c47ffdf",
  measurementId: "G-QRY63GX8DG",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {  
  app = firebase.app();
}

const auth = app.auth();
const firestore = app.firestore();
const storage = app.storage();

export const analytics = () => {
  if (typeof window !== "undefined") {
    return app.analytics();
  } else {
    return null;
  }
};

export const FieldValue = firebase.firestore.FieldValue;
export const Timestamp = firebase.firestore.Timestamp;

export { auth, firestore, storage };