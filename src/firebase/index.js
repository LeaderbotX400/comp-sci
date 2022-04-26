// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz4bvtFOdbaoGNgPpq3u175P8iDiBZEHU",
  authDomain: "vue-todo-3db07.firebaseapp.com",
  projectId: "vue-todo-3db07",
  storageBucket: "vue-todo-3db07.appspot.com",
  messagingSenderId: "626951328221",
  appId: "1:626951328221:web:6a15c0f6c30191086a6634",
  measurementId: "G-96JXNC4X13",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
