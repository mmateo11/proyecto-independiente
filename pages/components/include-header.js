function includeHTML(selector, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(selector).innerHTML = data;
      if (typeof window.actualizarHeader === "function") {
        window.actualizarHeader();
      }

      if (typeof window.InciarEventos === "function") {
        window.InciarEventos();
      }
    })
    .catch(error => console.error(`Error al cargar ${file}:`, error));
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const filePath = window.location.pathname.includes("/pages/")
    ? "../components/header.html"
    : "pages/components/header.html";

  includeHTML("header-container", filePath);
});