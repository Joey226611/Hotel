import { auth } from "./firebase-init.js";
import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

console.log("🛡️ Auth guard actief");

// eerst verbergen zodat niemand “flash” ziet
document.body.style.display = "none";

onAuthStateChanged(auth, (user) => {

  if (!user) {
    console.log("⛔ Geen user → redirect naar login");
    window.location.replace("/Hotel/Start/Login.html");
    return;
  }

  console.log("✅ User ingelogd:", user.displayName);

  // dashboard tonen
  document.body.style.display = "block";

  // optioneel: user data vullen
  const name = document.getElementById("userName");
  const email = document.getElementById("userEmail");
  const photo = document.getElementById("userPhoto");

  if (name) name.innerText = user.displayName || "User";
  if (email) email.innerText = user.email || "";
  if (photo) photo.src = user.photoURL || "";
});
