import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getDatabase,
  ref,
  set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 🔥 Firebase config
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

// 🧠 username → fake email
function toEmail(username) {
  return username + "@hotel.local";
}

// 🔐 REGISTER
window.register = function () {
  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");

  if (!usernameEl || !passwordEl) {
    document.getElementById("status").innerText = "Input error ❌";
    return;
  }

  const username = usernameEl.value;
  const password = passwordEl.value;

  createUserWithEmailAndPassword(auth, toEmail(username), password)
    .then((userCredential) => {

      set(ref(db, "users/" + userCredential.user.uid), {
        username: username
      });

      document.getElementById("status").innerText = "Account gemaakt 🔥";
    })
    .catch((error) => {
      document.getElementById("status").innerText = error.message;
    });
};

// 🚀 LOGIN
window.login = function () {
  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");

  if (!usernameEl || !passwordEl) {
    document.getElementById("status").innerText = "Input error ❌";
    return;
  }

  const username = usernameEl.value;
  const password = passwordEl.value;

  signInWithEmailAndPassword(auth, toEmail(username), password)
    .then(() => {
      document.getElementById("status").innerText = "Welkom 👋";
      window.location.href = "../dashboard.html";
    })
    .catch((error) => {
      document.getElementById("status").innerText = error.message;
    });
};
