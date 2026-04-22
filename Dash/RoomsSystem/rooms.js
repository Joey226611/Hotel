import { db, auth } from "../firebase.js";
import { ADMIN_EMAIL } from "../authGuard.js";

import { collection, addDoc, getDocs }
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const container = document.getElementById("roomsContainer");
const addBtn = document.getElementById("addRoomBtn");
const roomsRef = collection(db, "rooms");

let isAdmin = false;

// wacht tot user geladen is
onAuthStateChanged(auth, async (user) => {

  if(!user) return;

  // check admin
  if(user.email === ADMIN_EMAIL){
    isAdmin = true;
  } else {
    // verberg knop voor normale users
    addBtn.style.display = "none";
  }

  loadRooms();
});


// ADMIN → kamer toevoegen
addBtn.onclick = async () => {

  if(!isAdmin){
    alert("Only admin can create rooms");
    return;
  }

  const number = prompt("Room number?");
  const type = prompt("Room type?");

  if(!number || !type) return;

  await addDoc(roomsRef, {
    number: number,
    type: type,
    status: "Available"
  });

  location.reload();
};


// kamers laden
async function loadRooms(){
  container.innerHTML = "";

  const snapshot = await getDocs(roomsRef);

  snapshot.forEach(doc => {
    const room = doc.data();

    const div = document.createElement("div");
    div.className = "room-card";
    div.innerHTML = `
      <h2>Room ${room.number}</h2>
      <p>Type: ${room.type}</p>
      <p>Status: ${room.status}</p>
    `;

    container.appendChild(div);
  });
}
