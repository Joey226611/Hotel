import { auth, db } from "../firebase.js";
import { ADMIN_EMAIL } from "../authGuard.js";

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ===== ELEMENTEN =====
const container = document.getElementById("roomsContainer");
const addBtn = document.getElementById("addRoomBtn");

const addModal = document.getElementById("addModal");
const createRoomBtn = document.getElementById("createRoomBtn");

const settingsModal = document.getElementById("settingsModal");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const deleteRoomBtn = document.getElementById("deleteRoomBtn");

const statusSelect = document.getElementById("statusSelect");
const guestInput = document.getElementById("guestInput");
const nightsInput = document.getElementById("nightsInput");
const permStatus = document.getElementById("permStatus");
const permGuest = document.getElementById("permGuest");

const roomsRef = collection(db,"rooms");

let currentUser = null;
let isAdmin = false;
let selectedRoomId = null;
let selectedRoomData = null;

// ===== AUTH =====
onAuthStateChanged(auth, user=>{
  if(!user) return;

  currentUser = user;
  isAdmin = user.email === ADMIN_EMAIL;

  if(!isAdmin) addBtn.style.display="none";

  listenRooms();
});

// ===== REALTIME ROOMS =====
function listenRooms(){
  onSnapshot(roomsRef, snap=>{
    container.innerHTML="";

    snap.forEach(docSnap=>{
      const room = docSnap.data();
      const id = docSnap.id;

      const card = document.createElement("div");
      card.className="room-card";

      card.innerHTML=`
        <div class="room-gear">⚙️</div>
        <h2>Room ${room.number}</h2>
        <p>${room.type}</p>
        <p>€${room.price}/night</p>
        <p>Status: ${room.status}</p>
        <p>Guest: ${room.guestName || "-"}</p>
        <p>Nights: ${room.nights || "-"}</p>
      `;

      card.querySelector(".room-gear").onclick = ()=>{
        openSettings(id, room);
      };

      container.appendChild(card);
    });
  });
}

// ===== ADD ROOM =====
addBtn.onclick = ()=> addModal.classList.remove("hidden");
window.closeAddModal = ()=> addModal.classList.add("hidden");

createRoomBtn.onclick = async ()=>{
  const number = roomNumber.value;
  const type = roomType.value;
  const price = roomPrice.value;

  if(!number || !type || !price) return;

  await addDoc(roomsRef,{
    number,
    type,
    price,
    status:"Available",
    guestName:"",
    nights:"",
    permissions:{
      canEditStatus:true,
      canEditGuest:true
    },
    createdBy: currentUser.email,
    createdAt: Date.now()
  });

  addModal.classList.add("hidden");
};

// ===== SETTINGS OPEN =====
function openSettings(id,room){
  selectedRoomId = id;
  selectedRoomData = room;

  statusSelect.value = room.status;
  guestInput.value = room.guestName || "";
  nightsInput.value = room.nights || "";

  permStatus.checked = room.permissions?.canEditStatus;
  permGuest.checked = room.permissions?.canEditGuest;

  // permissions zichtbaar alleen voor admin
  if(!isAdmin){
    permStatus.parentElement.style.display="none";
    permGuest.parentElement.style.display="none";
    deleteRoomBtn.style.display="none";
  }

  settingsModal.classList.remove("hidden");
}

// ===== SAVE SETTINGS =====
saveSettingsBtn.onclick = async ()=>{
  if(!selectedRoomId) return;

  const roomRef = doc(db,"rooms",selectedRoomId);

  // user mag alleen wijzigen wat admin toestaat
  const updates = {};

  if(isAdmin || selectedRoomData.permissions.canEditStatus)
    updates.status = statusSelect.value;

  if(isAdmin || selectedRoomData.permissions.canEditGuest){
    updates.guestName = guestInput.value;
    updates.nights = nightsInput.value;
  }

  // alleen admin mag permissions aanpassen
  if(isAdmin){
    updates.permissions={
      canEditStatus: permStatus.checked,
      canEditGuest: permGuest.checked
    };
  }

  await updateDoc(roomRef,updates);
  settingsModal.classList.add("hidden");
};

// ===== DELETE ROOM =====
deleteRoomBtn.onclick = async ()=>{
  if(!isAdmin) return;

  const sure = confirm("Delete this room?");
  if(!sure) return;

  await deleteDoc(doc(db,"rooms",selectedRoomId));
  settingsModal.classList.add("hidden");
};
