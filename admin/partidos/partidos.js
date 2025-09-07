const API_URL = "http://localhost:3000/partidos";
const table = document.getElementById("partidoTable");
const form = document.getElementById("partidoForm");

async function loadpartido() {
  const res = await fetch(API_URL);
  const partidos = await res.json();

  table.innerHTML = "";

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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("partidoId").value;
  const rival = document.getElementById("rival").value;
  const golesLocal = document.getElementById("golesLocal").value;
  const golesRival = document.getElementById("golesRival").value;
  const fecha = document.getElementById("fecha").value;

  const data = {
    rival,
    resultado: `${golesLocal}-${golesRival}`,
    fecha
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
  document.getElementById("partidoId").value = ""; // limpiar id después de editar
  loadpartido();
});

async function deletepartido(id) {
  if (confirm("¿Seguro que quieres eliminar este partido?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadpartido();
  }
}

function editpartido(id, rival, resultado, fecha) {
  const [golesLocal = "", golesRival = ""] = resultado ? resultado.split("-") : ["", ""];

  document.getElementById("partidoId").value = id;
  document.getElementById("rival").value = rival;
  document.getElementById("golesLocal").value = golesLocal;
  document.getElementById("golesRival").value = golesRival;
  document.getElementById("fecha").value = fecha ? fecha.split("T")[0] : "";
}

loadpartido();
