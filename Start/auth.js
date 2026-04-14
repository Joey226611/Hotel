import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

console.log("🔥 AUTH JS GELADEN");

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

const toEmail = (u) => u + "@hotel.local";

window.addEventListener("DOMContentLoaded", () => {

  console.log("📦 DOM READY");

  const u = document.getElementById("username");
  const p = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const status = document.getElementById("status");

  if (!u || !p || !loginBtn || !registerBtn) {
    console.log("❌ ELEMENTS MISSING", { u, p, loginBtn, registerBtn });
    return;
  }

  loginBtn.addEventListener("click", () => {
    console.log("LOGIN CLICK");

    signInWithEmailAndPassword(auth, toEmail(u.value), p.value)
      .then(() => {
        status.innerText = "Welkom 👋";
        window.location.href = "../dashboard.html";
      })
      .catch(err => {
        console.log(err);
        status.innerText = err.message;
      });
  });

  registerBtn.addEventListener("click", () => {
    console.log("REGISTER CLICK");

    createUserWithEmailAndPassword(auth, toEmail(u.value), p.value)
      .then(() => {
        status.innerText = "Account gemaakt 🔥";
      })
      .catch(err => {
        console.log(err);
        status.innerText = err.message;
      });
  });

});
