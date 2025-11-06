document.addEventListener('DOMContentLoaded', () => {
    // Contenedores del DOM
    const contPrincipal = document.querySelector('.noticias-principales'); // Noticias principales
    const carousel = document.querySelector('.custom-carousel');           // Noticias secundarias

    // Función para crear card de noticia principal
    const createPrincipalCard = (noticia) => {
        const div = document.createElement('div');

        // Fondo de la card
        div.style.backgroundImage = `url(${noticia.url_imagen || 'https://placehold.co/600x400?text=No+Image'})`;
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';

        // Contenido de la card
        div.innerHTML = `
            <div class="titulo-noticias">${noticia.titulo || 'Sin título'}</div>
            <p>${noticia.resumen || 'Sin descripción'}</p>
        `;

        // Click para ir al detalle de la noticia
        div.addEventListener('click', () => {
            window.location.href = '/public/pages/noticias/detalle.html?id=' + noticia.id;
        });

        return div;
    };

    // Función para crear card de noticia secundaria (carousel)
    const createSecondaryCard = (noticia, isActive = false) => { //isActive valor predefiniod para las cartas
        const div = document.createElement('div');
        div.classList.add('item');
        if (isActive) div.classList.add('active');

        div.style.backgroundImage = `url(${noticia.url_imagen || 'https://placehold.co/320x400?text=No+Image'})`;
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';

        div.innerHTML = `
            <div class="item-desc">
                <h3>${noticia.titulo || 'Sin título'}</h3>
                <p>${noticia.resumen || 'Sin resumen'}</p>
            </div>
        `;

        // Click para cambiar la card activa en el carousel
        div.addEventListener('click', () => {
            carousel.querySelectorAll('.item').forEach(item => item.classList.remove('active'));
            div.classList.add('active');
        });

        return div;
    };

    // Función para cargar noticias desde la API y renderizarlas
    const fetchAndRenderMainNews = async () => {
        try {
            const response = await fetch(`${baseURL}/noticias`);
            if (!response.ok) throw new Error(`HTTP ${response.status} - No se pudieron cargar las noticias.`);

            const noticias = await response.json();
            if (!noticias || noticias.length === 0) return;

            // Renderizar noticias principales

            contPrincipal.innerHTML = '';
            const principales = noticias.filter(n => n.tipo === "PRINCIPAL").slice(0, 3);

            const principalFlex = document.createElement('div');
            principalFlex.classList.add('principal-flex');

            // Card grande
            if (principales[0]) {
                const grande = createPrincipalCard(principales[0]);
                grande.classList.add('noticia-grande');
                principalFlex.appendChild(grande);
            }

            // Cards chicas
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

            // Renderizar noticias secundarias (carousel)

            const secundarias = noticias
                .filter(n => n.tipo === "SECUNDARIO")
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) //ordena de mas reciente a mas vieja
                .slice(0, 6);

            carousel.innerHTML = '';
            secundarias.forEach((noticia, index) => {
                const card = createSecondaryCard(noticia, index === 0);
                carousel.appendChild(card);
            });

            // Inicializar Owl Carousel

            // Si el carousel ya estaba inicializado previamente, lo destruye
            if ($(carousel).hasClass("owl-loaded")) {
                $(carousel).trigger('destroy.owl.carousel').removeClass("owl-loaded");
            }

            // - loop: false → el carousel no se repite infinitamente
            $(carousel).owlCarousel({
                autoWidth: true,
                loop: false,
            });

        } catch (error) {
            console.error('Error cargando noticias:', error);
        }
    };

    // Ejecuta la función para cargar y renderizar noticias
    fetchAndRenderMainNews();
});
