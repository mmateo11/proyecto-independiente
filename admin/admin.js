const API_URL = "http://localhost:3000/jugadores";
const table = document.getElementById("playersTable");
const form = document.getElementById("playerForm");

async function loadPlayers() {
  const res = await fetch(API_URL);
  const players = await res.json();
  table.innerHTML = "";
  players.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.posicion}</td>
      <td>${p.dorsal}</td>
      <td><img src="${p.imagen}" alt="${p.nombre}" width="50"></td>
      <td>
        <button onclick="editPlayer('${p.id}', '${p.nombre}', '${p.posicion}', '${p.dorsal}', '${p.imagen}')">Editar</button>
        <button onclick="deletePlayer('${p.id}')">Borrar</button>
      </td>
    `;
    table.appendChild(row);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("playerId").value;
  const data = {
    nombre: document.getElementById("nombre").value,
    posicion: document.getElementById("posicion").value,
    dorsal: parseInt(document.getElementById("dorsal").value),
    url_imagen: document.getElementById("url_imagen").value
  };

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

  form.reset();
  document.getElementById("playerId").value = "";
  loadPlayers();
});

async function deletePlayer(id) {
  if (confirm("¿Seguro que quieres eliminar este jugador?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadPlayers();
  }
}

function editPlayer(id, nombre, posicion, dorsal, imagen) {
  document.getElementById("playerId").value = id;
  document.getElementById("nombre").value = nombre;
  document.getElementById("posicion").value = posicion;
  document.getElementById("dorsal").value = dorsal;
  document.getElementById("imagen").value = imagen;
}

loadPlayers();
