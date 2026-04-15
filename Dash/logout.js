import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.logoutUser = async () => {

  try {
    await signOut(auth);
    window.location.replace("/Hotel/Start/Login.html");

  } catch (err) {
    console.log("❌ Logout error:", err);
  }

};
