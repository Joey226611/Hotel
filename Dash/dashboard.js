import "./theme.js";

console.log("Dashboard loaded");

// menu knoppen
document.getElementById("roomsBtn").onclick = () => {
  location.href = "./RoomsSystem/RoomService.html";
};

document.getElementById("restaurantsBtn").onclick = () => {
  alert("Restaurants page coming soon 🍽");
};

document.getElementById("activitiesBtn").onclick = () => {
  alert("Activities page coming soon 🎯");
};

document.getElementById("adminBtn").onclick = () => {
  alert("Admin panel coming soon ⚙️");
};
