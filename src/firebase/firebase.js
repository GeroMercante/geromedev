import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB3X_qKK0wcpCUhZ9jIWScMQKNroCij3Uc",
  authDomain: "geromedev-c7c2b.firebaseapp.com",
  projectId: "geromedev-c7c2b",
  storageBucket: "geromedev-c7c2b.appspot.com",
  messagingSenderId: "501401573940",
  appId: "1:501401573940:web:8ea08dd4013cd531764861",
};

const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = getStorage(app);
const auth = getAuth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase, auth, storage };
