document.addEventListener('DOMContentLoaded', () => {
    const contPrincipal = document.querySelector('.noticias-principales'); // principales
    const carousel = document.querySelector('.custom-carousel');   // secundarias

    //Función para crear card de noticia principal ---
    const createPrincipalCard = (noticia) => {
        const div = document.createElement('div');

        div.style.backgroundImage = `url(${noticia.url_imagen || 'https://placehold.co/600x400?text=No+Image'})`;
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';

        div.innerHTML = `
            <div class="titulo-noticias">${noticia.titulo || 'Sin título'}</div>
            <p>${noticia.resumen || 'Sin descripción'}</p>
        `;

        div.addEventListener('click', () => {
           window.location.href = 'pages/noticias/detalle.html?id=' + noticia.id;
        });

        return div;
    };

    //Función para crear card de noticia secundaria
    const createSecondaryCard = (noticia, isActive = false) => {
        const div = document.createElement('div');
        div.classList.add('item');
        if (isActive) div.classList.add('active');

        div.style.backgroundImage = `url(${noticia.url_imagen || 'https://placehold.co/320x400?text=No+Image'})`;
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';

        div.innerHTML = `
            <div class="item-desc">
                <h3>${noticia.titulo || 'Sin título'}</h3>
                <p>${noticia.descripcion || 'Sin resumen'}</p>
            </div>
        `;

        div.addEventListener('click', () => {
            // Cambiar la card activa
            carousel.querySelectorAll('.item').forEach(item => item.classList.remove('active'));
            div.classList.add('active');
        });

        return div;
    };

    // --- Función para cargar noticias principales ---
    const fetchAndRenderMainNews = async () => {
        try {
            const response = await fetch('http://localhost:3000/noticias');
            if (!response.ok) throw new Error('No se pudieron cargar las noticias.');

            const noticias = await response.json();
            if (!noticias || noticias.length === 0) return;

            contPrincipal.innerHTML = '';
            const principales = noticias.filter(n => n.tipo === "PRINCIPAL").slice(0, 3);

            // Contenedor flex para principales
            const principalFlex = document.createElement('div');
            principalFlex.classList.add('principal-flex');

            // Noticia grande (izquierda)
            if (principales[0]) {
                const grande = createPrincipalCard(principales[0]);
                grande.classList.add('noticia-grande');
                principalFlex.appendChild(grande);
            }

            // Contenedor para las dos noticias chicas (derecha)
            const chicasContainer = document.createElement('div');
            chicasContainer.classList.add('noticia-chicas-container');

            [principales[1], principales[2]].forEach(n => {
                if (n) {
                    const chica = createPrincipalCard(n);
                    chica.classList.add('noticia-chica');
                    chicasContainer.appendChild(chica);
                }
            });

            principalFlex.appendChild(chicasContainer);
            contPrincipal.appendChild(principalFlex);

            // También renderizamos las secundarias en el carrusel
            const secundarias = noticias
                .filter(n => n.tipo === "SECUNDARIO")
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .slice(0, 6);

            carousel.innerHTML = '';
            secundarias.forEach((noticia, index) => {
                const card = createSecondaryCard(noticia, index === 0);
                carousel.appendChild(card);
            });

             if ($(carousel).hasClass("owl-loaded")) {
                $(carousel).trigger('destroy.owl.carousel').removeClass("owl-loaded");
            }

            $(carousel).owlCarousel({
                autoWidth: true,
                loop: false,
            });

            // ---------- Evento click fluido ----------
            div.addEventListener('click', () => {
            const items = carousel.querySelectorAll('.item');
            items.forEach(item => item.classList.remove('active'));
            div.classList.add('active');

            // Mover Owl al índice de la card clickeada
            const index = Array.from(items).indexOf(div);
            $(carousel).trigger('to.owl.carousel', [index, 300]); // 300ms animación
        });

        AOS.refresh(); 

        } catch (error) {
            console.error('Error cargando noticias:', error);
        }
    };

    fetchAndRenderMainNews();
});
