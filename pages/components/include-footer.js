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
    ? "../components/footer.html"
    : "pages/components/footer.html";

  includeFooter("footer-container", filePath);
});