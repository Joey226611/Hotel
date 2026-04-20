window.themeSelect?.addEventListener("change", e => {

  if (e.target.value === "light") {
    document.body.style.background = "#f4f4f4";
    document.body.style.color = "#111";
  } else {
    document.body.style.background = "black";
    document.body.style.color = "white";
  }

});
