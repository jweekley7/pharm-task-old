// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from "../environment/environment.prod";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const DBApp = getFirestore(app);