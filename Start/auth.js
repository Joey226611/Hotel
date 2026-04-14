import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase config
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
const auth = getAuth(app);
const db = getDatabase(app);

// REGISTER (USERNAME)
window.register = function () {
  const username = document.getElementById("email").value; // hergebruikt input
  const password = document.getElementById("password").value;

  const email = username + "@hotel.local";

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // opslaan username in database
      set(ref(db, "users/" + user.uid), {
        username: username
      });

      document.getElementById("status").innerText = "Account gemaakt 🔥";
    })
    .catch((error) => {
      document.getElementById("status").innerText = error.message;
    });
};

// LOGIN (USERNAME)
window.login = function () {
  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const email = username + "@hotel.local";

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("status").innerText = "Welkom 👋";
      window.location.href = "../dashboard.html";
    })
    .catch((error) => {
      document.getElementById("status").innerText = error.message;
    });
};
