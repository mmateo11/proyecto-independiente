function includeSponsors(selector, file) {
  fetch(file)
    .then(response => response.text()) // Se convierte la respuesta a texto
    .then(data => {
      // Se inserta el contenido del archivo en el elemento con el id especificado
      document.getElementById(selector).innerHTML = data;
    })
    .catch(error => 
      console.error(`Error al cargar ${file}:`, error) // Manejo de errores
    );
}

document.addEventListener("DOMContentLoaded", () => {
  // Determina la ruta del archivo según la ubicación actual de la página
  const filePath = window.location.pathname.includes("/pages/")
    ? "../assets/svg/sponsors.html"  // Si estamos en una subcarpeta
    : "assets/svg/sponsors.html";    // Si estamos en la raíz

  // Llama a la función para incluir los sponsors en el elemento con id "sponsors-container"
  includeSponsors("sponsors-container", filePath);
});
