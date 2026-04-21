import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const welcome = document.getElementById("welcomeText");

onAuthStateChanged(auth, user => {
  if(user){
    welcome.innerText = "Welkom " + (user.displayName || user.email);
  }
});

// live clock
setInterval(()=>{
  const now = new Date();
  document.getElementById("clock").innerText =
    now.toLocaleTimeString();
},1000);
