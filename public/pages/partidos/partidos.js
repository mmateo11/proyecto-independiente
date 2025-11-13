const container = document.getElementById("partidosContainer");

// Logos de los equipos
const logos = {
    "independiente": "/public/assets/img/logos/independiente.svg",
    "Boca Juniors": "/public/assets/img/logos/Boca Juniors.svg",
    "Atletico Tucuman": "/public/assets/img/logos/Atletico Tucuman.svg",
    "Riestra": "/public/assets/img/logos/Riestra.svg",
    "Rosario Central": "/public/assets/img/logos/Rosario Central.svg"
}; 

// Función para cargar los partidos desde la API
async function loadPartidos() {
    const res = await fetch(`${baseURL}/partidos`);   
    const partidos = await res.json();

    container.innerHTML = ""; 

    // Recorrer todos los partidos
    partidos.forEach((p, index) => {
        // Crear un div para cada partido
        const partidoDiv = document.createElement("div");
        partidoDiv.classList.add("partido");

        // Marcar el primer partido como "próximo"
        if (index === 0) partidoDiv.classList.add("proximo"); 

        // Insertar contenido HTML del partido
        partidoDiv.innerHTML = `
            <div class="equipos">
                <div class="equipo">
                    <img src="${logos["independiente"] || 'https://via.placeholder.com/50'}" alt="Independiente">
                    <span>Independiente</span>
                </div>
                <div class="vs">VS</div>
                <div class="equipo">
                    <img src="${logos[p.rival] || 'https://via.placeholder.com/50'}" alt="${p.rival}">
                    <span>${p.rival}</span>
                </div>
            </div>
            <div class="info">
                <div class="fecha">${new Date(p.fecha).toLocaleDateString()}</div>
                <div class="resultado">${p.resultado || '-'}</div>
                <a target="_blank" href="https://www.boleteriavip.com.ar/">
                    <button class="btn-comprar">Comprar entrada</button>
                </a>
            </div>
        `;

        // Agregar el div del partido al contenedor principal
        container.appendChild(partidoDiv);
    });
}

// Llamar a la función para cargar los partidos al iniciar la página
loadPartidos();
