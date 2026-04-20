import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  const welcome = document.querySelector(".welcome");
  const profilePic = document.getElementById("profilePic");
  const modal = document.getElementById("profileModal");
  const logoutBtn = document.getElementById("logoutBtn");

  // 🔐 USER CHECK
  onAuthStateChanged(auth, (user) => {
    if (!user) return;

    console.log("User:", user.email);

    if (welcome) {
      welcome.innerText = "Welkom " + (user.displayName || "User");
    }

    if (profilePic) {
      profilePic.src = user.photoURL || "https://i.pravatar.cc/100";
    }
  });

  // 👤 OPEN PROFILE
  profilePic?.addEventListener("click", () => {
    modal?.classList.remove("hidden");
  });

  // 🚪 LOGOUT
  logoutBtn?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "/Hotel/Start/Login.html";
  });

});
