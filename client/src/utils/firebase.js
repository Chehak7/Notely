import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authstudywithai.firebaseapp.com",
  projectId: "authstudywithai",
  storageBucket: "authstudywithai.firebasestorage.app",
  messagingSenderId: "533726241784",
  appId: "1:533726241784:web:237f4a8d1c4723e0edec0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()
export { auth, provider }
