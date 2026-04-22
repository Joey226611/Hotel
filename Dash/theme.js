const btn = document.getElementById("themeToggle");

let theme = localStorage.getItem("theme") || "dark";
document.body.classList.toggle("light", theme === "light");

btn.onclick = () => {
  document.body.classList.toggle("light");
  const newTheme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
};
