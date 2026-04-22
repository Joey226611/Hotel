import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const ADMIN_EMAIL = "jey3602@gmail.com";

onAuthStateChanged(auth, (user) => {

  // ❌ Niet ingelogd → terug naar login
  if (!user) {
    window.location.href = "../Start/Login.html";
    return;
  }

  // 👤 Zet email global zodat dashboard.js hem kan gebruiken
  window.currentUser = user;

  // ⭐ Admin check
  window.isAdmin = user.email === ADMIN_EMAIL;

  // Laat pagina pas zien wanneer auth klaar is
  document.body.style.visibility = "visible";
});
