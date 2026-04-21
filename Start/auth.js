import { auth } from "./firebase.js";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

console.log("🔥 Auth loaded");

const provider = new GoogleAuthProvider();

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");


// GOOGLE LOGIN
document.getElementById("googleBtn").onclick = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google login success", result.user);
    window.location.href = "../Dash/dashboard.html";
  } catch (error) {
    console.error("Google login error:", error);
    alert(error.message);
  }
};


// CREATE ACCOUNT
document.getElementById("createBtn").onclick = async () => {
  try {
    const email = emailInput.value;
    const password = passwordInput.value;

    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    // 📧 VERIFICATION MAIL STUREN
    await sendEmailVerification(userCred.user);

    alert("📧 Verificatie mail gestuurd! Check je inbox.");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};


// LOGIN
document.getElementById("loginBtn").onclick = async () => {
  try {
    const email = emailInput.value;
    const password = passwordInput.value;

    const userCred = await signInWithEmailAndPassword(auth, email, password);

    // 🔒 CHECK OF MAIL GEVERIFIEERD IS
    if (!userCred.user.emailVerified) {
      alert("📧 Verifieer eerst je email voordat je inlogt.");
      return;
    }

    window.location.href = "../Dash/dashboard.html";

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
