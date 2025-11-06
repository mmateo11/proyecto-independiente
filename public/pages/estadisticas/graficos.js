const teamId = "11";
const URL = `https://site.api.espn.com/apis/site/v2/sports/soccer/arg.1/teams/${teamId}/schedule`;

// Colores para los gráficos
const rojo = '#EC1C24';
const azul = '#36A2EB';
const amarillo = '#FFCD56';
const gris = '#808080';

// Fetch de datos
fetch(URL)
  .then(res => res.json())
  .then(data => {
    // --- Procesamiento de partidos ---
    const partidos = data.events.map(event => {
      const partido = event.competitions[0];
      const equipo = partido.competitors.find(c => c.team.id === teamId);
      const rival = partido.competitors.find(c => c.team.id !== teamId);

      return {
        rival: rival.team.displayName,
        golesFavor: equipo.score.value,
        golesContra: rival.score.value,
        victoria: equipo.winner,
      };
    });

    // --- Estadísticas generales ---
    const total = partidos.length;
    const ganados = partidos.filter(p => p.victoria).length;
    const empates = partidos.filter(p => p.golesFavor === p.golesContra).length;
    const perdidos = total - ganados - empates;
    const winRate = ((ganados / total) * 100).toFixed(1);

    const totalGolesFavor = partidos.reduce((acc, p) => acc + p.golesFavor, 0);
    const totalGolesContra = partidos.reduce((acc, p) => acc + p.golesContra, 0);

    // Etiquetas para los gráficos (nombres de rivales)
    const partidosLabels = partidos.map(p => p.rival);
    const golesFavorPorPartido = partidos.map(p => p.golesFavor);
    const golesContraPorPartido = partidos.map(p => p.golesContra);

    // --- Grafico 1: Win Rate ---
    new Chart(document.getElementById('winRateChart'), {
      type: 'doughnut',
      data: {
        labels: ['Ganados', 'Empates', 'Perdidos'],
        datasets: [{
          data: [ganados, empates, perdidos],
          backgroundColor: [rojo, azul, amarillo],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: gris, font: { weight: 800, size: 14 } } },
          title: { 
            display: true, 
            text: `Win Rate: ${winRate}%`, 
            color: '#FFF', 
            font: { weight: 700, size: 16 } 
          }
        }
      }
    });

    // Grafico 2: Total de Goles
    new Chart(document.getElementById('golesChart'), {
      type: 'bar',
      data: {
        labels: ['Goles a Favor', 'Goles en Contra'],
        datasets: [{
          label: 'Total de Goles',
          data: [totalGolesFavor, totalGolesContra],
          backgroundColor: [azul, rojo],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, ticks: { color: gris, stepSize: 1 } },
          x: { ticks: { color: gris } }
        },
        plugins: {
          legend: { display: false },
          title: { 
            display: true, 
            text: 'Goles a Favor vs En Contra', 
            color: '#FFF', 
            font: { weight: 700, size: 16 } 
          }
        }
      }
    });

    // --- Grafico 3: Goles por Partido ---
    new Chart(document.getElementById('golesLineaChart'), {
      type: 'line',
      data: {
        labels: partidosLabels,
        datasets: [
          {
            label: 'Goles a Favor',
            data: golesFavorPorPartido,
            borderColor: azul,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.2,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: azul
          },
          {
            label: 'Goles en Contra',
            data: golesContraPorPartido,
            borderColor: rojo,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.2,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: rojo
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#888', font: { weight: 700, size: 14 } } },
          title: { display: true, text: 'Goles por Partido', color: '#FFF', font: { weight: 700, size: 20 } }
        },
        scales: {
          y: { beginAtZero: true, ticks: { color: '#555', stepSize: 1 }, grid: { color: 'rgba(200,200,200,0.2)' } },
          x: { ticks: { color: '#FFF' }, grid: { display: false } }
        }
      }
    });

  })
  .catch(err => console.error('Error cargando el schedule:', err));
