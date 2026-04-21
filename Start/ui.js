import { loginGoogle, loginEmail, registerEmail } from "./auth.js";

// DOM READY SAFE WRAPPER
document.addEventListener("DOMContentLoaded", () => {

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const googleBtn = document.getElementById("googleBtn");
  const errorBox = document.getElementById("errorMsg");

  function safeError(msg){
    if(errorBox) errorBox.innerText = msg;
    console.log("❌", msg);
  }

  // GOOGLE
  if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
      try {
        await loginGoogle();
        window.location.href = "../Dash/dashboard.html";
      } catch (e) {
        safeError(e.message);
      }
    });
  }

  // LOGIN
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      try {
        if (!email.value || !password.value) {
          return safeError("Vul email en wachtwoord in");
        }

        await loginEmail(email.value, password.value);
        window.location.href = "../Dash/dashboard.html";

      } catch (e) {
        safeError(e.message);
      }
    });
  }

  // REGISTER
  if (registerBtn) {
    registerBtn.addEventListener("click", async () => {
      try {
        if (!email.value || !password.value) {
          return safeError("Vul email en wachtwoord in");
        }

        await registerEmail(email.value, password.value);
        safeError("📧 Verificatie mail gestuurd!");

      } catch (e) {
        safeError(e.message);
      }
    });
  }

});
