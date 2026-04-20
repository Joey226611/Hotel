document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("themeToggle");

  toggle?.addEventListener("change", (e) => {
    if (e.target.value === "light") {
      document.body.style.background = "#f8fafc";
      document.body.style.color = "#111";
    } else {
      document.body.style.background = "#0f172a";
      document.body.style.color = "#fff";
    }
  });

});
