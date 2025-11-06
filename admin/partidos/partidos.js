// URL base de la API 
const API_URL = "http://localhost:3000/partidos";

// Referencias del DOM
const table = document.getElementById("partidoTable");
const form = document.getElementById("partidoForm");

/* Carga todos los partidos desde la API y los muestra en la tabla */
async function loadpartido() {
  const res = await fetch(API_URL);
  const partidos = await res.json();

  table.innerHTML = ""; // limpia la tabla antes de volver a renderizar

  partidos.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.rival}</td>
      <td>${p.resultado}</td>
      <td>${p.fecha ? new Date(p.fecha).toLocaleDateString() : ""}</td> 
      <td>
        <button type="button" onclick="editpartido('${p.id}', '${p.rival}', '${p.resultado}', '${p.fecha}')">Editar</button>
        <button type="button" onclick="deletepartido('${p.id}')">Borrar</button>
      </td>
    `;
    table.appendChild(row);
  });
}

/* Maneja el envío del formulario para crear o actualizar un partido */
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita el comportamiento por defecto del formulario

  // Obtiene los valores de los campos del formulario
  const id = document.getElementById("partidoId").value;
  const rival = document.getElementById("rival").value;
  const golesLocal = document.getElementById("golesLocal").value;
  const golesRival = document.getElementById("golesRival").value;
  const fecha = document.getElementById("fecha").value;

  // Construye el objeto con los datos del partido
  const data = {
    rival,
    resultado: `${golesLocal}-${golesRival}`,
    fecha
  };

  // Si hay un ID, se actualiza, si no, se crea un nuevo registro
  if (id) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }

  // Limpia el formulario y recarga la tabla
  form.reset();
  document.getElementById("partidoId").value = ""; 
  loadpartido();
});

/* Elimina un partido seleccionado después de confirmarlo */
async function deletepartido(id) {
  if (confirm("¿Seguro que quieres eliminar este partido?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadpartido();
  }
}

/* Carga los datos de un partido en el formulario para poder editarlo */
function editpartido(id, rival, resultado, fecha) {
  const [golesLocal = "", golesRival = ""] = resultado ? resultado.split("-") : ["", ""];  
  //separa los goles con "-"

  document.getElementById("partidoId").value = id;
  document.getElementById("rival").value = rival;
  document.getElementById("golesLocal").value = golesLocal;
  document.getElementById("golesRival").value = golesRival;
  document.getElementById("fecha").value = fecha ? fecha.split("T")[0] : ""; 
  // corta el string hasta la T, primer parte de la fecha desde la base de datos
}

/* Inicializa la carga de partidos al abrir la página. */
loadpartido();
