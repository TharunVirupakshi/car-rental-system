// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "carrentalsys-b9fac.firebaseapp.com",
  projectId: "carrentalsys-b9fac",
  storageBucket: "carrentalsys-b9fac.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_SNDR_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MSRMNT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export {app, auth}