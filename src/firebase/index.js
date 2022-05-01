// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCtRPrBfcrjniwe3ubBZ1KIH8noYdiglD0",
  authDomain: "comp-sci-site.firebaseapp.com",
  projectId: "comp-sci-site",
  storageBucket: "comp-sci-site.appspot.com",
  messagingSenderId: "298035394065",
  appId: "1:298035394065:web:f09e47af36cf1d49f323b0",
  measurementId: "G-8EPST1RMB6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
