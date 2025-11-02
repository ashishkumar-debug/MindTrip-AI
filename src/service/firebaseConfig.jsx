// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLZyPfkv5fTzCYFfQexCBef-DuR2bi7S4",
  authDomain: "aitripplanner-70da8.firebaseapp.com",
  projectId: "aitripplanner-70da8",
  storageBucket: "aitripplanner-70da8.firebasestorage.app",
  messagingSenderId: "1070967276997",
  appId: "1:1070967276997:web:4669f0972d7bea3dccb7ac",
  measurementId: "G-CZ67NFJZ05"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);