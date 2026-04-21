import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  const avatar = document.getElementById("avatar");
  const modal = document.getElementById("profileModal");
  const logoutBtn = document.getElementById("logoutBtn");
  const themeBtn = document.getElementById("themeBtn");

  // 🟡 Avatar opent profile menu
  avatar.addEventListener("click", () => {
    modal.classList.toggle("hidden");
  });

  // 🔒 Klik buiten modal = sluiten
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // 🌗 THEME TOGGLE (met opslaan)
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("lightTheme");

    const isLight = document.body.classList.contains("lightTheme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  // 🌞 Theme laden bij start
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("lightTheme");
  }

  // 🚪 LOGOUT (nu werkt hij echt)
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "../Start/Login.html";
  });

});
