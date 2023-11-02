// Import the functions you need from the SDKs you need
import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtkmG9Z7HWCfGHjM8omgVA_LCNemv5wmQ",
  authDomain: "infx490-d9876.firebaseapp.com",
  databaseURL: "https://infx490-d9876-default-rtdb.firebaseio.com",
  projectId: "infx490-d9876",
  storageBucket: "infx490-d9876.appspot.com",
  messagingSenderId: "602189178002",
  appId: "1:602189178002:web:5d56c140f3ef5a8acef24b",
  measurementId: "G-MNNEM90NZC",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
export { auth, app };
