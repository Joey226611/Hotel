import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

export const ADMIN_EMAIL = "jey3602@gmail.com";

onAuthStateChanged(auth, user => {

  // niet ingelogd → terug naar login
  if (!user) {
    location.href = "../Start/Login.html";
    return;
  }

  // pagina zichtbaar maken (bestaat op elke pagina)
  document.body.style.visibility = "visible";

  // ===== OPTIONAL ELEMENTS (bestaan niet op elke pagina!) =====
  const logoutBtn = document.getElementById("logoutBtn");
  const profilePic = document.getElementById("profilePic");
  const adminBtn = document.getElementById("adminBtn");

  // logout knop alleen uitvoeren als hij bestaat
  if (logoutBtn) {
    logoutBtn.onclick = async () => {
      await signOut(auth);
      location.href = "../Start/Login.html";
    };
  }

  // profielfoto alleen als element bestaat
  if (profilePic) {
    profilePic.src = user.photoURL || "https://i.imgur.com/6VBx3io.png";
  }

  // admin knop tonen indien aanwezig
  if (adminBtn && user.email === ADMIN_EMAIL) {
    adminBtn.style.display = "block";
  }

});
