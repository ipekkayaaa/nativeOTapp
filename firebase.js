// import firebase from "firebase";
// import "firebase/database";


// // // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDtkmG9Z7HWCfGHjM8omgVA_LCNemv5wmQ",
//   authDomain: "infx490-d9876.firebaseapp.com",
//   databaseURL: "https://infx490-d9876-default-rtdb.firebaseio.com",
//   projectId: "infx490-d9876",
//   storageBucket: "infx490-d9876.appspot.com",
//   messagingSenderId: "602189178002",
//   appId: "1:602189178002:web:5d56c140f3ef5a8acef24b",
//   measurementId: "G-MNNEM90NZC",
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// const auth = firebase.auth();

// // Initialize Firebase Realtime Database
// const db = firebase.database();

// export { auth, db };


// for verison 10.5.2
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtkmG9Z7HWCfGHjM8omgVA_LCNemv5wmQ",
  authDomain: "infx490-d9876.firebaseapp.com",
  databaseURL: "https://infx490-d9876-default-rtdb.firebaseio.com",
  projectId: "infx490-d9876",
  storageBucket: "infx490-d9876.appspot.com",
  messagingSenderId: "602189178002",
  appId: "1:602189178002:web:5d56c140f3ef5a8acef24b",
  measurementId: "G-MNNEM90NZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };


// // for version 8.

// import firebase from "firebase/app"; 
// import "firebase/auth"; 
// import "firebase/database"; 
// import "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDtkmG9Z7HWCfGHjM8omgVA_LCNemv5wmQ",
//   authDomain: "infx490-d9876.firebaseapp.com",
//   databaseURL: "https://infx490-d9876-default-rtdb.firebaseio.com",
//   projectId: "infx490-d9876",
//   storageBucket: "infx490-d9876.appspot.com",
//   messagingSenderId: "602189178002",
//   appId: "1:602189178002:web:5d56c140f3ef5a8acef24b",
//   measurementId: "G-MNNEM90NZC"
// };
// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);


// const auth = firebase.auth();


// const db = firebase.database();

// export { auth, db };
