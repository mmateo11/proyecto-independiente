function includeFooter(selector, file) {
  fetch(file)
    .then(response => response.text()) // Se convierte la respuesta a texto
    .then(data => {
      // Se inserta el contenido del archivo en el elemento con el id especificado
      document.getElementById(selector).innerHTML = data;
    })
    .catch(error => 
      console.error(`Error al cargar ${file}:`, error)
    );
}

document.addEventListener("DOMContentLoaded", () => {
  // Determina la ruta del archivo según la ubicación actual de la página
  const filePath = window.location.pathname.includes("/pages/")
    ? "../components/footer.html"  // Si estamos en una subcarpeta
    : "pages/components/footer.html"; // Si estamos en la raíz

  // Llama a la función para incluir el footer en el elemento con id "footer-container"
  includeFooter("footer-container", filePath);
});
