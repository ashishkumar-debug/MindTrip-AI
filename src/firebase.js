import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLZyPfkv5fTzCYFfQexCBef-DuR2bi7S4",
  authDomain: "aitripplanner-70da8.firebaseapp.com",
  projectId: "aitripplanner-70da8",
  storageBucket: "aitripplanner-70da8.firebasestorage.app",
  messagingSenderId: "1070967276997",
  appId: "1:1070967276997:web:4669f0972d7bea3dccb7ac"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
