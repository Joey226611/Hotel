import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// wacht tot auth geladen is
onAuthStateChanged(auth, (user) => 

  // ❌ Niet ingelogd → terug naar login
  if (!user) {
    console.log("⛔ Not logged in → redirect");
    window.location.href = "../Start/Login.html";
    return;
  }

  // ✅ Wel ingelogd
  console.log("✅ User authenticated:", user.email);
});
