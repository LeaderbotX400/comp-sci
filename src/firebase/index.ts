import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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
const functions = getFunctions(app);
const storage = getStorage(app);
getAnalytics(app);
getPerformance(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LeXN_YfAAAAAGkxdp2FlIHIsrMsJ-C8URAfunJE"),
  isTokenAutoRefreshEnabled: true,
});

export { auth, db, storage, functions, appCheck };
