import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const welcome = document.getElementById("welcomeText");
const avatar = document.getElementById("avatar");
const logoutBtn = document.getElementById("logoutBtn");

// ⏰ Live clock
setInterval(() => {
  const now = new Date();
  const clock = document.getElementById("clock");
  if (clock) clock.innerText = now.toLocaleTimeString();
}, 1000);

// 🔐 Check login + load user data
onAuthStateChanged(auth, (user) => {

  if (!user) return;

  console.log("👤 User loaded:", user);

  // 👋 Welcome text
  if (welcome) {
    welcome.innerText = "Welkom " + (user.displayName || user.email);
  }

  // 🖼 Profielfoto fix
  if (avatar) {
    if (user.photoURL) {
      avatar.src = user.photoURL;
    } else {
      avatar.src = "https://i.imgur.com/6VBx3io.png"; // fallback avatar
    }
  }

  // 🚪 Logout knop FIX
  if (logoutBtn) {
    logoutBtn.onclick = async () => {
      await signOut(auth);
      window.location.href = "../Start/Login.html";
    };
  }

});
