import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

console.log("🔥 Firebase Google Auth loaded");

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
const provider = new GoogleAuthProvider();

// 🔐 Google login
document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("googleLoginBtn");

  if (!btn) {
    console.log("❌ Google button not found");
    return;
  }

  btn.addEventListener("click", () => {

    signInWithPopup(auth, provider)
      .then((result) => {

        const user = result.user;

        console.log("✅ Logged in:", user.displayName);

        window.location.href = "../dashboard.html";

      })
      .catch((error) => {
        console.log("❌ Google login error:", error);
      });

  });

});
