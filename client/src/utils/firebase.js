// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjS5OEYqndxeYuQxGxAkfQoAS3JliuBUw",
  authDomain: "authstudywithai.firebaseapp.com",
  projectId: "authstudywithai",
  storageBucket: "authstudywithai.firebasestorage.app",
  messagingSenderId: "533726241784",
  appId: "1:533726241784:web:237f4a8d1c4723e0edec0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Google Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();