document.addEventListener("DOMContentLoaded", async () => {
  const track = document.querySelector(".jugadores-track");
  const infoNombre = document.querySelector(".jugadores-nombre");
  const infoRol = document.querySelector(".jugadores-pos");
  const botonIzquierda = document.querySelector(".jugadores-left");
  const botonDerecha = document.querySelector(".jugadores-right");
  const contenedorPuntos = document.querySelector(".jugadores-dots");

  //Variables globales
  let jugadores = [];
  let indiceActual = 0;
  let animacion = false;

  //Crear tarjeta de jugador
  const crearTarjetaJugador = (jugador, indice) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("jugadores-card");
    tarjeta.dataset.index = indice; //Indica un data-index en cada card

    tarjeta.innerHTML = `
      <img src="${jugador.url_imagen || 'https://placehold.co/300x300?text=Sin+Imagen'}" 
           alt="${jugador.nombre}">
    `;

    tarjeta.addEventListener("click", () => actualizarCarrusel(indice)); 
    //Te lleva a la carta que fue clickeada, por medio de su índice

    tarjeta.addEventListener('click', () => {
           window.location.href = 'pages/jugadores/detalle.html?id=' + jugador.id;
        });
    return tarjeta;
  };

  //Crear punto indice
  const crearPunto = (indice) => {
    const punto = document.createElement("div");
    punto.classList.add("jugadores-dot");
    punto.dataset.index = indice;
    punto.addEventListener("click", () => actualizarCarrusel(indice));
    //Te lleva a la carta segun el punto que tocaste, segun el indice
    return punto;
  };

  //Actualizar visualmente el carrusel
  const actualizarCarrusel = (nuevoIndice) => {
    if (animacion || jugadores.length === 0) return; //Evita que se superpongan animaciones
    animacion = true;

    const total = jugadores.length;
    indiceActual = (nuevoIndice + total) % total; //Permite un bucle entre las cartas

    const tarjetas = document.querySelectorAll(".jugadores-card");
    const puntos = document.querySelectorAll(".jugadores-dot");

    tarjetas.forEach((tarjeta, i) => {
      const offset = (i - indiceActual + total) % total; 
      //Calcula por medio de un bucle, que tan lejos está cada card de la ACTIVA
      tarjeta.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");

      if (offset === 0) tarjeta.classList.add("center"); //Card 0, la activa
      else if (offset === 1) tarjeta.classList.add("right-1"); //La primera a la derecha
      else if (offset === 2) tarjeta.classList.add("right-2"); //La segunda a la derecha
      else if (offset === total - 1) tarjeta.classList.add("left-1"); //La primera a la izquierda
      else if (offset === total - 2) tarjeta.classList.add("left-2"); //La segunda a la izquierda
      else tarjeta.classList.add("hidden"); //Las demas quedan ocultas
    });

    puntos.forEach((p, i) => p.classList.toggle("active", i === indiceActual)); 
    //Mostrar activo el punto seleccionado


    //Transición de información
    infoNombre.style.opacity = "0";
    infoRol.style.opacity = "0";

    setTimeout(() => {
      infoNombre.textContent = jugadores[indiceActual].nombre;
      infoRol.textContent = jugadores[indiceActual].posicion || "Sin posición";
      infoNombre.style.opacity = "1";
      infoRol.style.opacity = "1";
    }, 300);

    setTimeout(() => {
      animacion = false;
    }, 800);
  };

  //Renderizar todo el carrusel
  const renderizarCarrusel = () => {
    track.innerHTML = "";
    contenedorPuntos.innerHTML = "";

    jugadores.forEach((jugador, i) => {
      track.appendChild(crearTarjetaJugador(jugador, i));
      contenedorPuntos.appendChild(crearPunto(i));
    });
  };

  //Cargar jugadores desde la API
  const obtenerJugadores = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/jugadores");
      if (!respuesta.ok) throw new Error("Error al obtener jugadores");
      jugadores = await respuesta.json();

      if (!jugadores.length) {
        console.error("No se encontraron jugadores en la base de datos.");
        return;
      }

      renderizarCarrusel();
      actualizarCarrusel(0);
      AOS.refresh();
    } catch (error) {
      console.error("Hubo un error al cargar los jugadores:", error);
    }
  };

  //Eventos de navegacion
  botonIzquierda.addEventListener("click", () => actualizarCarrusel(indiceActual - 1)); //posicion actual -1, a la izquierda
  botonDerecha.addEventListener("click", () => actualizarCarrusel(indiceActual + 1)); //posicion actual +1, a la derecha

  //Navegacion con teclado, hace lo mismo que arriba pero detecta las teclas
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") actualizarCarrusel(indiceActual - 1);
    else if (e.key === "ArrowRight") actualizarCarrusel(indiceActual + 1);
  });

  //Soporte tactil
  let toqueInicio = 0;
  let toqueFin = 0;

  document.addEventListener("touchstart", (e) => {
    toqueInicio = e.changedTouches[0].screenX; //Detecta la posicion inicial del toque
  });

  document.addEventListener("touchend", (e) => {
    toqueFin = e.changedTouches[0].screenX; //Detecta la posicion final del toque
    const diferencia = toqueInicio - toqueFin; //Calcula la diferencia para definir para donde swipea

    if (Math.abs(diferencia) > 50) {
      if (diferencia > 0) actualizarCarrusel(indiceActual + 1); //Si es entre 0 y 50, swipeo a la derecha
      else actualizarCarrusel(indiceActual - 1); //sino, swipeo a la izquierda
    }
  });

  await obtenerJugadores();
});
