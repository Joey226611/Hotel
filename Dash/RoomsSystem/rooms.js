import { auth, db } from "../firebase.js";
import { ADMIN_EMAIL } from "../authGuard.js";

import { 
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const container = document.getElementById("roomsContainer");
const addBtn = document.getElementById("addRoomBtn");

let isAdmin = false;

// wacht op login
onAuthStateChanged(auth, async (user) => {

  if (!user) return;

  if (user.email === ADMIN_EMAIL) {
    isAdmin = true;
  } else {
    addBtn.style.display = "none";
  }

  await loadRooms();
});


// ⭐ BELANGRIJK: collection pas aanmaken NA firebase init
function getRoomsRef() {
  return collection(db, "rooms");
}


// kamer toevoegen (admin only)
addBtn.onclick = async () => {

  if (!isAdmin) {
    alert("Admin only");
    return;
  }

  const number = prompt("Room number?");
  const type = prompt("Room type?");

  if (!number || !type) return;

  await addDoc(getRoomsRef(), {
    number,
    type,
    status: "Available"
  });

  location.reload();
};


// kamers laden
async function loadRooms() {
  container.innerHTML = "";

  const snapshot = await getDocs(getRoomsRef());

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
