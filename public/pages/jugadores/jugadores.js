document.addEventListener("DOMContentLoaded", async () => {
  // Elementos del DOM
  const track = document.querySelector(".jugadores-track");
  const infoNombre = document.querySelector(".jugadores-nombre");
  const infoRol = document.querySelector(".jugadores-pos");
  const botonIzquierda = document.querySelector(".jugadores-left");
  const botonDerecha = document.querySelector(".jugadores-right");
  const contenedorPuntos = document.querySelector(".jugadores-dots");

  // Variables globales del carrusel
  let jugadores = [];
  let indiceActual = 0;
  let animacion = false;

  // Crear tarjeta de jugador
  const crearTarjetaJugador = (jugador, indice) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("jugadores-card");
    tarjeta.dataset.index = indice; // Guarda el índice en un data attribute

    tarjeta.innerHTML = `
      <img src="${jugador.url_imagen || 'https://placehold.co/300x300?text=Sin+Imagen'}" 
           alt="${jugador.nombre}">
    `;

    // Click sobre la tarjeta: actualiza carrusel y redirige a detalle
    tarjeta.addEventListener("click", () => actualizarCarrusel(indice));
    tarjeta.addEventListener("click", () => {
      window.location.href = '/public/pages/jugadores/detalle.html?id=' + jugador.id;
    });

    return tarjeta;
  };

  // Crear punto índice del carrusel
  const crearPunto = (indice) => {
    const punto = document.createElement("div");
    punto.classList.add("jugadores-dot");
    punto.dataset.index = indice;

    // Click sobre el punto: actualiza carrusel
    punto.addEventListener("click", () => actualizarCarrusel(indice));

    return punto;
  };

  // Actualizar visualmente el carrusel
  const actualizarCarrusel = (nuevoIndice) => {
    if (animacion || jugadores.length === 0) return; // Evita superposición de animaciones
    animacion = true;

    const total = jugadores.length;
    indiceActual = (nuevoIndice + total) % total; // Bucle entre cartas

    const tarjetas = document.querySelectorAll(".jugadores-card");
    const puntos = document.querySelectorAll(".jugadores-dot");

    // Ajusta clases de cada tarjeta según su posición relativa a la activa
    tarjetas.forEach((tarjeta, i) => {
      const offset = (i - indiceActual + total) % total;
      tarjeta.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");

      if (offset === 0) tarjeta.classList.add("center");
      else if (offset === 1) tarjeta.classList.add("right-1");
      else if (offset === 2) tarjeta.classList.add("right-2");
      else if (offset === total - 1) tarjeta.classList.add("left-1");
      else if (offset === total - 2) tarjeta.classList.add("left-2");
      else tarjeta.classList.add("hidden");
    });

    // Actualiza el punto activo
    puntos.forEach((p, i) => p.classList.toggle("active", i === indiceActual));

    // Transición de información del jugador
    infoNombre.style.opacity = "0";
    infoRol.style.opacity = "0";

    setTimeout(() => {
      infoNombre.textContent = jugadores[indiceActual].nombre;
      infoRol.textContent = jugadores[indiceActual].posicion || "Sin posición";
      infoNombre.style.opacity = "1";
      infoRol.style.opacity = "1";
    }, 300);

    // Permite nuevas animaciones después de 800ms
    setTimeout(() => {
      animacion = false;
    }, 800);
  };

  // Renderizar todo el carrusel
  const renderizarCarrusel = () => {
    track.innerHTML = "";
    contenedorPuntos.innerHTML = "";

    jugadores.forEach((jugador, i) => {
      track.appendChild(crearTarjetaJugador(jugador, i));
      contenedorPuntos.appendChild(crearPunto(i));
    });
  };

  // Cargar jugadores desde la API
  const obtenerJugadores = async () => {
    try {
      const respuesta = await fetch(`${baseURL}/jugadores`);
      if (!respuesta.ok) throw new Error("Error al obtener jugadores");

      jugadores = await respuesta.json();

      if (!jugadores.length) {
        console.error("No se encontraron jugadores en la base de datos.");
        return;
      }

      renderizarCarrusel();
      actualizarCarrusel(0); // Muestra la primera tarjeta
      AOS.refresh(); // Actualiza animaciones AOS
    } catch (error) {
      console.error("Hubo un error al cargar los jugadores:", error);
    }
  };

  // Eventos de navegación
  botonIzquierda.addEventListener("click", () => actualizarCarrusel(indiceActual - 1));
  botonDerecha.addEventListener("click", () => actualizarCarrusel(indiceActual + 1));

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") actualizarCarrusel(indiceActual - 1);
    else if (e.key === "ArrowRight") actualizarCarrusel(indiceActual + 1);
  });

  // Soporte táctil (swipe)
  let toqueInicio = 0;
  let toqueFin = 0;

  document.addEventListener("touchstart", (e) => {
    toqueInicio = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    toqueFin = e.changedTouches[0].screenX;
    const diferencia = toqueInicio - toqueFin;

    if (Math.abs(diferencia) > 50) {
      if (diferencia > 0) actualizarCarrusel(indiceActual + 1); // Swipe izquierda -> siguiente
      else actualizarCarrusel(indiceActual - 1); // Swipe derecha -> anterior
    }
  });

  // Inicializa carrusel cargando jugadores
  await obtenerJugadores();
});
