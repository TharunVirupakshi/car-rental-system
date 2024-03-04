// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "carrentalsys-b9fac.firebaseapp.com",
  projectId: "carrentalsys-b9fac",
  storageBucket: "carrentalsys-b9fac.appspot.com",
  messagingSenderId: process.env.FIREBASE_MSG_SNDR_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MSRMNT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);