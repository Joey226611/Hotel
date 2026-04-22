import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const ADMIN_EMAIL = "jey3602@gmail.com";

onAuthStateChanged(auth, user => {

  if(!user){
    location.href = "../Start/Login.html";
    return;
  }

  // toon dashboard pas wanneer user bestaat
  document.body.style.visibility = "visible";

  // admin knop zichtbaar maken
  if(user.email === ADMIN_EMAIL){
    document.getElementById("adminBtn").style.display = "block";
  }

  // profielfoto laden
  const pic = document.getElementById("profilePic");
  pic.src = user.photoURL || "https://i.imgur.com/6VBx3io.png";

  // logout
  document.getElementById("logoutBtn").onclick = async () => {
    await signOut(auth);
    location.href = "../Start/Login.html";
  };

});
