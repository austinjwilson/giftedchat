// import * as firebase from 'firebase';
// import { intializeApp, getApp } from 'firebase/app';
// import { initializeFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import 'firebase/auth';
// import 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyAJyhTIsUXCowm19I9tKTVNyx_EqnMEH9U",
//     authDomain: "gifted-chat-aa716.firebaseapp.com",
//     projectId: "gifted-chat-aa716",
//     storageBucket: "gifted-chat-aa716.appspot.com",
//     messagingSenderId: "128110158248",
//     appId: "1:128110158248:web:f5b3c1a5e942dc4ea6bd9d"
//   };
  
// let app;
// if (firebase.apps.length === 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app()
// }

// const db = app.firestore();
// const auth = firebase.auth();
import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAJyhTIsUXCowm19I9tKTVNyx_EqnMEH9U",
    authDomain: "gifted-chat-aa716.firebaseapp.com",
    projectId: "gifted-chat-aa716",
    storageBucket: "gifted-chat-aa716.appspot.com",
    messagingSenderId: "128110158248",
    appId: "1:128110158248:web:f5b3c1a5e942dc4ea6bd9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

export { db, auth };