import { auth } from "./firebase.js";
import { GoogleAuthProvider, signInWithPopup, sendEmailVerification } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const provider = new GoogleAuthProvider();

window.loginWithGoogle = async () => {

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // 📧 Als mail nog niet verified is → stuur mail
    if (!user.emailVerified) {
      await sendEmailVerification(user);
      alert("📧 Verificatie mail gestuurd! Check je inbox.");
      return; // nog NIET naar dashboard
    }

    // ✔ verified → dashboard
    window.location.replace("/Hotel/Dash/dashboard.html");

  } catch (err) {
    console.log("Login error:", err);
  }

};
