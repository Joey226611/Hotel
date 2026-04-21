document.addEventListener("DOMContentLoaded", () => {

  const avatar = document.getElementById("avatar");
  const modal = document.getElementById("profileModal");

  if (!avatar || !modal) return;

  avatar.addEventListener("click", () => {
    modal.classList.toggle("hidden");
  });

  // close modal als je buiten klikt
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

});
