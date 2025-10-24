const API_URL = "/partidos"; // tu endpoint
const container = document.getElementById("partidosContainer");
const logos = {
    "independiente":"/proyecto/assets/img/logos/independiente.svg",
    "Boca Juniors": "/proyecto/assets/img/logos/Boca Juniors.svg",
    "River Plate": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Escudo_del_CARiverPlate.svg",
    "Racing": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Escudo_del_Club_Atl%C3%A9tico_Racing.svg",
    };


async function loadPartidos() {
    const res = await fetch(API_URL);   
    const partidos = await res.json();

    container.innerHTML = ""; // limpiar antes de renderizar    

    partidos.forEach((p, index) => {
        const partidoDiv = document.createElement("div");
        partidoDiv.classList.add("partido");
        if (index === 0) partidoDiv.classList.add("proximo"); // marcar el primer partido como próximo

        partidoDiv.innerHTML = `
            <div class="equipos">
                <div class="equipo">
                    <img src="${logos["independiente"] || 'https://via.placeholder.com/50'}" alt="independiente">                    <span>Independiente</span>
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
                <button class="btn-comprar">Comprar entrada</button>
            </div>
        `;

        container.appendChild(partidoDiv);
    });
}

loadPartidos();

