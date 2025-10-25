function includeFooter(selector, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(selector).innerHTML = data;
    })
    .catch(error => console.error(`Error al cargar ${file}:`, error));
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const filePath = window.location.pathname.includes("/pages/")
    ? "../assets/svg/sponsors.html"
    : "assets/svg/sponsors.html";

  includeFooter("sponsors-container", filePath);
});