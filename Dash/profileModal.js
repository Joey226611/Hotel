document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("profileModal");

  window.closeProfile = () => {
    modal?.classList.add("hidden");
  };

});
