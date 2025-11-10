// URL base de la API
const API_URL = "http://localhost:3000/api/jugadores";

// Referencias a elementos del DOM
const table = document.getElementById("playersTable");
const form = document.getElementById("playerForm");

/* Muestra los registros creados en la tabla por medio de la API */

async function loadPlayers() {
  const res = await fetch(API_URL);
  const players = await res.json();

  table.innerHTML = "";

  players.forEach(p => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.posicion}</td>
      <td>${p.edad}</td>
      <td>${p.lugar_nacimiento}</td>
      <td>${p.nacionalidad}</td>
      <td>${p.peso}</td>
      <td>${p.dorsal}</td>
      <td><img src="${p.url_imagen}" alt="${p.nombre}" width="100px"></td>
      <td>
        <button onclick="editPlayer('${p.id}', '${p.nombre}', '${p.posicion}', '${p.edad}', '${p.lugar_nacimiento}', '${p.nacionalidad}', '${p.peso}', '${p.dorsal}', '${p.url_imagen}')">Editar</button>
        <button onclick="deletePlayer('${p.id}')">Borrar</button>
      </td>
    `;

    table.appendChild(row);
  });
}

/* Maneja el envío del formulario para crear o actualizar un jugador */

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("playerId").value;

  // Datos capturados del formulario
  const data = {
    nombre: document.getElementById("nombre").value,
    posicion: document.getElementById("posicion").value,
    edad: parseInt(document.getElementById("edad").value),
    lugar_nacimiento: document.getElementById("lugar_nacimiento").value,
    nacionalidad: document.getElementById("nacionalidad").value,
    peso: parseFloat(document.getElementById("peso").value),
    dorsal: parseInt(document.getElementById("dorsal").value),
    url_imagen: document.getElementById("url_imagen").value
  };

  // Si hay un ID, se actualiza; si no, se crea un nuevo jugador
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
  document.getElementById("playerId").value = "";
  loadPlayers(); // Pide de nuevo todos los registros para que se actualizen
});

/*  Elimina un jugador por su ID luego de confirmación. */
async function deletePlayer(id) {
  if (confirm("¿Seguro que quieres eliminar este jugador?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadPlayers(); // Actualiza los registros
  }
}

/* Carga los datos del jugador seleccionado en el formulario para editarlo */

function editPlayer(id, nombre, posicion, edad, lugar_nacimiento, nacionalidad, peso, dorsal, url_imagen) {
  document.getElementById("playerId").value = id;
  document.getElementById("nombre").value = nombre;
  document.getElementById("posicion").value = posicion;
  document.getElementById("edad").value = edad;
  document.getElementById("lugar_nacimiento").value = lugar_nacimiento;
  document.getElementById("nacionalidad").value = nacionalidad;
  document.getElementById("peso").value = peso;
  document.getElementById("dorsal").value = dorsal;
  document.getElementById("url_imagen").value = url_imagen;
}

// Carga inicial de los jugadores al abrir la página
loadPlayers();