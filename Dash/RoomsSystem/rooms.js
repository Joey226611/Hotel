import { auth, db } from "../firebase.js";
import { ADMIN_EMAIL } from "../authGuard.js";

import { 
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const container = document.getElementById("roomsContainer");
const addBtn = document.getElementById("addRoomBtn");

let isAdmin = false;
const roomsRef = collection(db, "rooms");

onAuthStateChanged(auth, user => {
  if (!user) return;

  // admin check
  if (user.email === ADMIN_EMAIL) {
    isAdmin = true;
  } else {
    addBtn.style.display = "none";
  }

  // realtime rooms listener 🔥
  listenToRooms();
});


// ADMIN → kamer toevoegen
addBtn.onclick = async () => {

  if (!isAdmin) return;

  const number = prompt("Room number?");
  const type = prompt("Room type?");

  if (!number || !type) return;

  await addDoc(roomsRef, {
    number,
    type,
    status: "Available",
    createdAt: Date.now()
  });
};


// realtime kamers laden
function listenToRooms() {

  onSnapshot(roomsRef, snapshot => {
    container.innerHTML = "";

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
  });

}
