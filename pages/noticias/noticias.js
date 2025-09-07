document.addEventListener('DOMContentLoaded', () => {
    const contPrincipal = document.querySelector('.principales');   // principales
    const contSecundario = document.querySelector('.noticias-flex'); // secundarias

    // Crear card para noticias principales
    const createPrincipalCard = (noticia) => {
        const div = document.createElement('div');
        div.classList.add('noticia1');

        div.style.backgroundImage = `url(${noticia.url_imagen || 'https://placehold.co/600x400?text=No+Image'})`;
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';

        div.innerHTML = `
            <h2>${noticia.titulo || 'Sin título'}</h2>
            <p>${noticia.descripcion || 'Sin descripción'}</p>
        `;


        div.addEventListener('click', () => {
            window.location.href = `/noticia/${noticia.id}`;
        });

        return div;
    };

    // Crear card para noticias secundarias con la estructura que pasaste
    const createSecundarioCard = (noticia) => {
        const div = document.createElement('div');
        div.classList.add('noticia-flex-item');

        div.innerHTML = `
            <div class="noticia-overlay">
                <img src="${noticia.url_imagen || 'https://placehold.co/600x400?text=No+Image'}" alt="${noticia.titulo}">
                <div class="noticia-texto">${noticia.titulo || 'Sin título'}</div>
            </div>
            <p class="noticia-descripcion">${noticia.descripcion || 'Sin descripción'}</p>
        `;

        div.addEventListener('click', () => {
            window.location.href = `/noticia/${noticia.id}`;
        });

        return div;
    };

    const fetchAndRenderNews = async () => {
        try {
            const response = await fetch('http://localhost:3000/noticias');
            if (!response.ok) throw new Error('No se pudieron cargar las noticias.');

            const noticias = await response.json();
            if (!noticias || noticias.length === 0) return;

            contPrincipal.innerHTML = '';
            contSecundario.innerHTML = '';

            noticias
                .filter(n => n.tipo === "PRINCIPAL")
                .slice(0, 4)
                .forEach(n => contPrincipal.appendChild(createPrincipalCard(n)));

        
            noticias
                .filter(n => n.tipo === "SECUNDARIO")
                .slice(0, 4)
                .forEach(n => contSecundario.appendChild(createSecundarioCard(n)));

        } catch (error) {
            console.error('Error cargando noticias:', error);
        }
    };

    fetchAndRenderNews();
});
