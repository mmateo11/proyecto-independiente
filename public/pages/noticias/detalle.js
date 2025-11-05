document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    try {
        
        const res = await fetch(`${baseURL}/noticias/${id}`)

        if  (!res.ok) throw new Error('No se pudo cargar la noticia.');
        const noticia = await res.json();

        document.getElementById('detalle-titulo').textContent = noticia.titulo;
        document.getElementById('detalle-resumen').textContent = noticia.resumen;
        document.getElementById('detalle-img').src = noticia.url_imagen || 'https://placehold.co/600x400?text=No+Image';
        document.getElementById('detalle-descripcion').textContent = noticia.descripcion;
        document.getElementById('detalle-fecha').textContent = new Date(noticia.fecha).toLocaleDateString();
    } catch (err) {
        console.error(err);
        document.querySelector('.detalle-noticia').innerHTML = '<p>Error al cargar la noticia</p>';
    }
});
