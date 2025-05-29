// client/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGL4H8nVJN1tbgT_hSPeJh8x5yEUoB-hQ",
  authDomain: "trishulreddysfarmcon-a4ee9188.firebaseapp.com",
  databaseURL: "https://trishulreddysfarmcon-a4ee9188-default-rtdb.firebaseio.com",
  projectId: "trishulreddysfarmcon-a4ee9188",
  storageBucket: "trishulreddysfarmcon-a4ee9188.appspot.com",
  messagingSenderId: "469786199583",
  appId: "1:469786199583:web:8240b950e7c0cc4923b72a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);         // ✅ Added Firestore
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider };  // ✅ Export db
