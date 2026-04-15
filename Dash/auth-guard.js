import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.body.style.display = "none";

onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.replace("/Hotel/Start/Login.html");
    return;
  }

  document.body.style.display = "block";

});
