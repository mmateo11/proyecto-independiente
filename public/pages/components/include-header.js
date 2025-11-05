function includeHeader(selector, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(selector).innerHTML = data;

      // Avisar que el header ya se cargó
      document.dispatchEvent(new CustomEvent('headerLoaded'));
    })
    .catch(error => console.error(`Error al cargar ${file}:`, error));
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const filePath = window.location.pathname.includes("/pages/")
    ? "../components/header.html"
    : "pages/components/header.html";

  includeHeader("header-container", filePath);
});
