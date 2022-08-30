// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// dane do projektu
const firebaseConfig = {
  apiKey: "AIzaSyA4JR9Y_ami3s_NWzoKl0dRNCBxqikrEQI",
  authDomain: "house-marketplace-app-919c3.firebaseapp.com",
  projectId: "house-marketplace-app-919c3",
  storageBucket: "house-marketplace-app-919c3.appspot.com",
  messagingSenderId: "603120599794",
  appId: "1:603120599794:web:ec2020bd10bf7e9855866b",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
