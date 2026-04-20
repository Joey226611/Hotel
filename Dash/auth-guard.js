import { auth } from "./firebase.js";
import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.body.style.display = "none";

onAuthStateChanged(auth, async (user) => {

  // ❌ Niet ingelogd → login pagina
  if (!user) {
    window.location.replace("/Hotel/Start/Login.html");
    return;
  }

  // ❌ Mail niet verified → terug naar login
  if (!user.emailVerified) {
    alert("📧 Verifieer eerst je email!");
    window.location.replace("/Hotel/Start/Login.html");
    return;
  }

  // ✔ Alles goed → dashboard tonen
  document.body.style.display = "block";

  document.getElementById("userName").innerText = user.displayName;
  document.getElementById("userEmail").innerText = user.email;
  document.getElementById("userPhoto").src = user.photoURL;
});
