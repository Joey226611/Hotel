import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeidcBbNTGKb_GtXEad20Xpug1Se9e9x0",
  authDomain: "hotelreception.firebaseapp.com",
  projectId: "hotelreception"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.addEventListener("DOMContentLoaded", () => {

  const nameEl = document.getElementById("userName");
  const mailEl = document.getElementById("userEmail");
  const imgEl = document.getElementById("userPhoto");
  const logoutBtn = document.getElementById("logoutBtn");

  onAuthStateChanged(auth, (user) => {
    if (!user) return;

    nameEl.innerText = user.displayName;
    mailEl.innerText = user.email;
    imgEl.src = user.photoURL;
  });

  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "../Start/Login.html";
  });

});
