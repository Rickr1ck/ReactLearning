// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcDqTQjhv07tFVZT2lhbxKIWAHgeHIVrE",
  authDomain: "practiceprojects-8d494.firebaseapp.com",
  projectId: "practiceprojects-8d494",
  storageBucket: "practiceprojects-8d494.firebasestorage.app",
  messagingSenderId: "394591763819",
  appId: "1:394591763819:web:dca66ebbc2a3e064f5602e",
  measurementId: "G-VDWKS4HKXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)


export const db=getFirestore(app)