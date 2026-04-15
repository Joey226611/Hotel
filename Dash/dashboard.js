import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

  if (!user) return;

  document.getElementById("userName").innerText = user.displayName;
  document.getElementById("userEmail").innerText = user.email;
  document.getElementById("userPhoto").src = user.photoURL;

});
