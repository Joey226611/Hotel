import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// 🧠 username → fake email
const toEmail = (u) => u + "@hotel.local";

window.addEventListener("DOMContentLoaded", () => {

  const u = document.getElementById("username");
  const p = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const status = document.getElementById("status");

  // 💥 safety check
  if (!u || !p || !loginBtn || !registerBtn) {
    console.log("Missing elements:", { u, p, loginBtn, registerBtn });
    return;
  }

  // 🚀 LOGIN
  loginBtn.addEventListener("click", () => {
    signInWithEmailAndPassword(auth, toEmail(u.value), p.value)
      .then(() => {
        status.innerText = "Welkom 👋";
        window.location.href = "../dashboard.html";
      })
      .catch(err => status.innerText = err.message);
  });

  // 🔐 REGISTER
  registerBtn.addEventListener("click", () => {
    createUserWithEmailAndPassword(auth, toEmail(u.value), p.value)
      .then(() => {
        status.innerText = "Account gemaakt 🔥";
      })
      .catch(err => status.innerText = err.message);
  });

});
