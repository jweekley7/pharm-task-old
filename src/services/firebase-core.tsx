// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from "../environment/environment.prod";
import { getAuth } from "firebase/auth";

import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const DBApp = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

firebase.initializeApp(firebaseConfig);

// Initialize the FirebaseUI Widget using Firebase.
export const firebaseUi = new firebaseui.auth.AuthUI(firebase.auth());

export const uiConfig = {
  //signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  // tosUrl: '<your-tos-url>',
  // // Privacy policy url/callback.
  // privacyPolicyUrl: function() {
  //   window.location.assign('<your-privacy-policy-url>');
  // }
};

// firebaseUi.start('#firebaseui-auth-container', {
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//   ],
//   // Other config options...
// });