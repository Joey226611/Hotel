window.closeProfile = () => {
  document.getElementById("profileModal").classList.add("hidden");
};

document.getElementById("avatar").onclick = () => {
  document.getElementById("profileModal").classList.remove("hidden");
};

document.getElementById("theme").onchange = (e) => {
  if (e.target.value === "light") {
    document.body.style.background = "#eee";
    document.body.style.color = "#000";
  } else {
    document.body.style.background = "#0a0a0a";
    document.body.style.color = "#fff";
  }
};
