import { db } from "../firebase.js";
import { collection, addDoc, getDocs } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const container = document.getElementById("roomsContainer");
const addBtn = document.getElementById("addRoomBtn");

const roomsRef = collection(db, "rooms");

loadRooms();

// kamer toevoegen
addBtn.onclick = async () => {
  const number = prompt("Room number?");
  const type = prompt("Room type? (Single/Double/Suite)");

  if(!number || !type) return;

  await addDoc(roomsRef, {
    number,
    type,
    status: "Available"
  });

  location.reload();
};

// kamers laden
async function loadRooms(){
  const snapshot = await getDocs(roomsRef);

  snapshot.forEach(doc => {
    const room = doc.data();

    container.innerHTML += `
      <div class="room-card">
        <h2>Room ${room.number}</h2>
        <p>Type: ${room.type}</p>
        <p>Status: ${room.status}</p>
      </div>
    `;
  });
}
