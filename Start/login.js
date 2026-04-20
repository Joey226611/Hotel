import { auth } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const provider = new GoogleAuthProvider();

let confirmationResult;

// ================= GOOGLE LOGIN =================
document.getElementById("googleBtn").onclick = async () => {
  try {
    const res = await signInWithPopup(auth, provider);

    console.log("Google login:", res.user.email);

    window.location.href = "/Hotel/Dash/dashboard.html";

  } catch (err) {
    console.log(err);
  }
};

// ================= PHONE LOGIN =================

// invisible recaptcha
window.recaptchaVerifier = new RecaptchaVerifier(auth, "sendCode", {
  size: "invisible"
});

// SEND SMS
document.getElementById("sendCode").onclick = async () => {

  const phone = document.getElementById("phone").value;

  try {
    confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );

    alert("📱 SMS sent!");

  } catch (err) {
    console.log("SMS error:", err);
  }

};

// VERIFY SMS
document.getElementById("verify").onclick = async () => {

  const code = document.getElementById("code").value;

  try {
    const result = await confirmationResult.confirm(code);

    console.log("Phone login success:", result.user);

    window.location.href = "/Hotel/Dash/dashboard.html";

  } catch (err) {
    console.log("Wrong code:", err);
  }

};
