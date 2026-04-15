import { auth } from "./firebase.js";
import { GoogleAuthProvider, signInWithPopup } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const provider = new GoogleAuthProvider();

window.loginWithGoogle = async () => {

  try {
    console.log("🔐 Google login start");
    await signInWithPopup(auth, provider);
    window.location.replace("/Hotel/Dash/dashboard.html");

  } catch (err) {
    console.log("❌ Login error:", err);
  }

};
