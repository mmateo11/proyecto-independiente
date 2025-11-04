const API_URL = "/api/partidos"; // tu endpoint
const container = document.getElementById("partidosContainer");
const logos = {
    "independiente": "/proyecto/public/assets/img/logos/independiente.svg",
    "Boca Juniors": "/proyecto/public/assets/img/logos/Boca Juniors.svg",
    "Atletico tucuman": "/proyecto/public/assets/img/logos/atletico tucuman.svg",
    "Riestra": "/proyecto/public/assets/img/logos/Riestra.svg",
    "Rosario Central": "/proyecto/public/assets/img/logos/rosario central.svg"
    };  


async function loadPartidos() {
    const res = await fetch(API_URL);   
    const partidos = await res.json();

    container.innerHTML = ""; 

    partidos.forEach((p, index) => {
        const partidoDiv = document.createElement("div");
        partidoDiv.classList.add("partido");
        if (index === 0) partidoDiv.classList.add("proximo"); 

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

