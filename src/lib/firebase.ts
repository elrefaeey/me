import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAH7_kDMDEKSzkjkBHXN34RIjn8XPEZJp4",
  authDomain: "elrefaey-db24e.firebaseapp.com",
  projectId: "elrefaey-db24e",
  storageBucket: "elrefaey-db24e.firebasestorage.app",
  messagingSenderId: "727174864672",
  appId: "1:727174864672:web:f794f1e820ef71ea2dc145",
  measurementId: "G-0RYRYPD714"
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
