const API_URL = "http://localhost:3000/noticias";
const table = document.getElementById("noticiaTable");
const form = document.getElementById("noticiaForm");

async function loadnoticia() {
  const res = await fetch(API_URL);
  const noticias = await res.json();
  
  table.innerHTML = "";

  noticias.forEach(n => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${n.titulo}</td>
      <td>${n.tipo}</td>
      <td>${n.resumen}</td>
      <td>${n.descripcion}</td>
      <td>${n.fecha || ""}</td>
      <td><img src="${n.url_imagen}" alt="${n.titulo}" width="50"></td>
      <td>
        <button type="button" onclick="editnoticia('${n.id}', '${n.titulo}', '${n.tipo}','${n.resumen}', '${n.descripcion}', '${n.url_imagen}')">Editar</button>
        <button type="button" onclick="deletenoticia('${n.id}')">Borrar</button>
      </td>
    `;
    table.appendChild(row);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("noticiaId").value;
  const data = {
    titulo: document.getElementById("titulo").value,
    tipo: document.getElementById("tipo").value,
    resumen: document.getElementById("resumen").value,
    descripcion: document.getElementById("descripcion").value,
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
  document.getElementById("noticiaId").value = ""; // limpiar id después de editar
  loadnoticia();
});

async function deletenoticia(id) {
  if (confirm("¿Seguro que quieres eliminar esta noticia?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadnoticia();
  }
}

function editnoticia(id, titulo, tipo, resumen, descripcion, url_imagen) {
  document.getElementById("noticiaId").value = id;
  document.getElementById("titulo").value = titulo;
  document.getElementById("resumen").value = resumen;
  document.getElementById("tipo").value = tipo;
  document.getElementById("descripcion").value = descripcion;
  document.getElementById("url_imagen").value = url_imagen;
}

loadnoticia();
