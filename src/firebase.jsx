import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG3V8gT-zSWRFPlHVr8vBnBoHL6cD7kSE",
  authDomain: "finance-tracker-e8255.firebaseapp.com",
  projectId: "finance-tracker-e8255",
  storageBucket: "finance-tracker-e8255.firebasestorage.app",
  messagingSenderId: "323362102837",
  appId: "1:323362102837:web:a52e2fde91e75398bd1b7c",
  measurementId: "G-P91NHXNZCR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where
};