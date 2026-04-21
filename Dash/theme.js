const btn = document.getElementById("themeBtn");

if (btn) {
  btn.onclick = () => {

    document.body.classList.toggle("lightTheme");

    // opslaan in browser
    const isLight = document.body.classList.contains("lightTheme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  };
}

// theme laden bij start
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("lightTheme");
  }
});
