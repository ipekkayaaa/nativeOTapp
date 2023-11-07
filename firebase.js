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

import firebase from "firebase/app"; // Import the core Firebase module
import "firebase/auth"; // Import the Firebase Authentication module
import "firebase/database"; // Import the Firebase Realtime Database module

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
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

// Initialize Firebase Realtime Database
const db = firebase.database();

export { auth, db };
