document.addEventListener('DOMContentLoaded', () => {

const carouselTrack = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let currentPosition = 0;

// Función para crear una tarjeta de jugador
const createPlayerCard = (jugador) => {
    const li = document.createElement('li');
    li.classList.add('carousel-card');
    
    li.innerHTML = `
        <img src="${jugador.url_imagen || 'https://placehold.co/250x250?text=No+Image'}" 
                alt="Foto de ${jugador.nombre || ''}" class="carousel-card-image">
        <h3 class="carousel-card-title">${jugador.nombre || 'Desconocido'}</h3>
        <p class="carousel-card-text">Posición: ${jugador.posicion || 'N/A'}</p>
        <p class="carousel-card-text">Dorsal: ${jugador.dorsal || 'N/A'}</p>
    `;
    return li;
};

// Función para renderizar las tarjetas a partir de los datos
const renderPlayers = (jugadores) => {
    carouselTrack.innerHTML = ''; // Limpiar el carrusel antes de renderizar
    jugadores.forEach(jugador => {
        const card = createPlayerCard(jugador);
        carouselTrack.appendChild(card);
    });
};

// Función principal para obtener datos y renderizar
const fetchDataAndRender = async () => {
    try {
        // Realizar la llamada a la API
        const response = await fetch('http://localhost:3000/jugadores');
        
        // Si la respuesta no es correcta, lanzar un error
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de jugadores de la base de datos.');
        }

        const jugadores = await response.json();
        
        // Si la llamada falla o no hay datos, muestra un mensaje
        if (!jugadores || jugadores.length === 0) {
            console.error('No se encontraron jugadores en la base de datos.');
            return;
        }

        renderPlayers(jugadores);

    } catch (error) {
        console.error('Hubo un error al cargar los jugadores:', error);
    }
};

// Lógica de navegación del carrusel
const moveCarousel = (direction) => {
    const numCards = document.querySelectorAll('.carousel-card').length;
    if (direction === 'next' && currentPosition < numCards - 1) {
        currentPosition++;
    } else if (direction === 'prev' && currentPosition > 0) {
        currentPosition--;
    }
    carouselTrack.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
};

prevButton.addEventListener('click', () => moveCarousel('prev'));
nextButton.addEventListener('click', () => moveCarousel('next'));

// Cargar los datos al inicio
fetchDataAndRender();
});
