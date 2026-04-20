import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/Hotel/Start/Login.html";
    return;
  }

  document.getElementById("name").innerText = user.displayName;
  document.getElementById("email").innerText = user.email;
  document.getElementById("avatar").src = user.photoURL;
});

document.getElementById("logoutBtn").onclick = () => {
  signOut(auth).then(() => {
    window.location.href = "/Hotel/Start/Login.html";
  });
};
