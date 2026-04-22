// Firebase init (SAFE VERSION)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ⚠️ PLAK HIER JE EIGEN FIREBASE CONFIG
 const firebaseConfig = {
  apiKey: "AIzaSyBeidcBbNTGKb_GtXEad20Xpug1Se9e9x0",
  authDomain: "hotelreception.firebaseapp.com",
 databaseURL: "https://hotelreception-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hotelreception",
  storageBucket: "hotelreception.firebasestorage.app",
  messagingSenderId: "162982201655",
  appId: "1:162982201655:web:e7730850e09d3670d032b2"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
