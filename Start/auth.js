import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeidcBbNTGKb_GtXEad20Xpug1Se9e9x0",
  authDomain: "hotelreception.firebaseapp.com",
  databaseURL: "https://hotelreception-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hotelreception",
  storageBucket: "hotelreception.firebasestorage.app",
  messagingSenderId: "162982201655",
  appId: "1:162982201655:web:e7730850e09d3670d032b2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 💾 REGISTER
document.getElementById("registerBtn").addEventListener("click", () => {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) return;

  set(ref(db, "users/" + username), {
    password: password
  });

  document.getElementById("status").innerText = "Account gemaakt 🔥";
});

// 🔐 LOGIN
document.getElementById("loginBtn").addEventListener("click", async () => {

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const dbRef = ref(db);

  const snapshot = await get(child(dbRef, "users/" + username));

  if (!snapshot.exists()) {
    document.getElementById("status").innerText = "User bestaat niet ❌";
    return;
  }

  const data = snapshot.val();

  if (data.password === password) {
    document.getElementById("status").innerText = "Welkom 👋";
    window.location.href = "../dashboard.html";
  } else {
    document.getElementById("status").innerText = "Wachtwoord fout ❌";
  }
});
